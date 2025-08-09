// app/Controllers/Http/MessagesController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'

export default class MessagesController {

  public async destroy({ params, response }: HttpContextContract) {
    const msg = await Message.find(params.id)
    if (!msg) return response.notFound({ message: 'Message tidak ditemukan' })

    await msg.delete()
    return { message: 'Message sukses delete' }
  }
}
