// database/seeders/Conversation.ts
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Conversation from 'App/Models/Conversation'
import Message from 'App/Models/Message'

export default class ConversationSeeder extends BaseSeeder {
  public async run () {
    // Buat 3 conversation
    for (let i = 1; i <= 3; i++) {
      const conv = await Conversation.create({
        sesionId: `session_${i}`,
        lastMessages: `Pesan terakhir di conversation ${i}`,
      })

      // Tambah 3 pesan per conversation
      await Message.createMany([
        {
          conversationId: conv.id,
          senderType: 'user',
          message: `Halo dari user di conversation ${i}`,
        },
        {
          conversationId: conv.id,
          senderType: 'bot',
          message: `Halo dari bot di conversation ${i}`,
        },
        {
          conversationId: conv.id,
          senderType: 'user',
          message: `Pesan akhir user di conversation ${i}`,
        },
      ])
    }
  }
}
