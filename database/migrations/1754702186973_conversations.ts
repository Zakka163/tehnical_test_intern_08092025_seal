import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Conversations extends BaseSchema {
  protected tableName = 'conversations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('sesion_id').notNullable().index()
      table
        .integer('messages_id')
        .unsigned()
        .references('id')
        .inTable('messages')
        .onDelete('SET NULL')
        .nullable()
        .index()
      table.text('last_messages').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
