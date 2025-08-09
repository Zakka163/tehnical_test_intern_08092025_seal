// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conversation from 'App/Models/Conversation'
import  { ConversationValidator } from 'App/Validators/ConversationQueryValidator'

export default class ConversationsController {

  public async index({ request }: HttpContextContract) {
    const payload = await request.validate({
      schema: ConversationValidator.indexQuery,
      messages: ConversationValidator.messages,
    })

    const page = payload.page || 1
    const limit = payload.limit || 10

    const sessionId = payload.sesion_id
    const q = payload.q
    const sort = payload.sort || 'id'
    const order = payload.order || 'desc'

    const query = Conversation.query()

    if (sessionId) {
      query.where('session_id', sessionId)
    }

    if (q) query.whereILike('last_messages', `%${q}%`)

    const sortMap: Record<string, string> = {
      id: 'id',
      created_at: 'created_at',
      updated_at: 'updated_at',
    }
    query.orderBy(sortMap[sort], order)


    return await query.paginate(page, limit)
  }



  public async show({ request,params, response }: HttpContextContract) {
    const { id } = await request.validate({
      schema: ConversationValidator.idParam,
      data: { id: Number(params.id) },
      messages: ConversationValidator.messages,
    })
    const conversation = await Conversation
      .query()
      .where('id', id)
      .preload('messages', (m) => m.orderBy('id', 'asc'))
      .first()

    if (!conversation) {
      return response.notFound({ message: 'Conversation tidak ditemukan' })
    }

    return conversation
  }


  public async destroy({ request,params, response }: HttpContextContract) {
    const { id } = await request.validate({
      schema: ConversationValidator.idParam,
      data: { id: Number(params.id) },
      messages: ConversationValidator.messages,
    })
    const conversation = await Conversation.find(id)

    if (!conversation) {
      return response.notFound({ message: 'Conversation tidak ditemukan' })
    }

    await conversation.delete()
    return { message: 'Conversation sukses delete' }
  }
}
