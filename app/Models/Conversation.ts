import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'

export default class Conversation extends BaseModel {
  public static table = 'conversations'
  @column({ isPrimary: true }) public id: number
  @column() public sesionId: string
  @column() public lastMessages?: string | null
  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime
  @hasMany(() => Message, {
    foreignKey: 'conversationId',
  }) public messages: HasMany<typeof Message>
}
