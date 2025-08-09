// app/Controllers/Http/QuestionsController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Database from '@ioc:Adonis/Lucid/Database'
import Conversation from 'App/Models/Conversation'
import Message from 'App/Models/Message'
import QuestionValidator from 'App/Validators/QuestionValidator'
import { randomUUID } from 'crypto'

export default class QuestionsController {
  public async store({ request, response }: HttpContextContract) {
    const { question } = await request.validate(QuestionValidator)
    const sessionId = request.input('session_id') || randomUUID()
    const trx = await Database.transaction()
    try {

      let conversation = await Conversation.query({ client: trx })
        .where('sesion_id', sessionId)
        .first()

      if (!conversation) {
        conversation = await Conversation.create(
          { sesionId: sessionId, lastMessages: null },
          { client: trx }
        )
      }
      const userMsg = await Message.create(
        {
          conversationId: conversation.id,
          senderType: 'user',
          message: question,
        },
        { client: trx }
      )

      const extUrl = 'https://api.majadigidev.jatimprov.go.id/api/external/chatbot/send-message'
      const extResp = await axios.post(
        extUrl,
        {
          session_id: sessionId,
          question: question,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 20_000,
        }
      )

      const extData = extResp?.data ?? {}
      const dataObj = extData.data ?? {}
      const messagesArr = Array.isArray(dataObj.message) ? dataObj.message : []
      const firstMsg = messagesArr[0]

      const botAnswer: string =
        (firstMsg && typeof firstMsg.text === 'string' && firstMsg.text) ||
        JSON.stringify(extData)
      let finalBotMessage = botAnswer
      if (firstMsg && Array.isArray(firstMsg.suggest_links) && firstMsg.suggest_links.length > 0) {
        finalBotMessage +=
          '\n\nLinks:\n' +
          firstMsg.suggest_links.map((l: any) => `- ${l.title}: ${l.link}`).join('\n')
      }
      const botMsg = await Message.create(
        {
          conversationId: conversation.id,
          senderType: 'bot',
          message: finalBotMessage,
        },
        { client: trx }
      )

      conversation.lastMessages = finalBotMessage
      await conversation.useTransaction(trx).save()

      await trx.commit()

      return response.ok({
        session_id: sessionId,
        conversation_id: conversation.id,
        question_message_id: userMsg.id,
        answer_message_id: botMsg.id,
        answer: finalBotMessage,
        statusCode: extData.statusCode ?? 200,
      })
    } catch (err: any) {
      await trx.rollback()
      return response.internalServerError({
        message: 'Gagal memproses pertanyaan',
        reason: err?.message,
        external: err?.response?.data,
      })
    }
  }
}
