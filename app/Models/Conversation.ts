import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column({ columnName: 'sesion_id' }) public sesionId: string
  @column({ columnName: 'messages_id' }) public messagesId: number | null
  @column({ columnName: 'last_messages' }) public lastMessages: string | null
  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime
}
