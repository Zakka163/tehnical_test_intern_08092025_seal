import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up () {

  await this.schema.dropTableIfExists('messages')
  await this.schema.dropTableIfExists('conversations')

  await this.schema.createTable('conversations', (table) => {
    table.increments('id')

    table.string('sesion_id').notNullable().index()
    table.text('last_messages').nullable()
    table.timestamps(true)
  })


  await this.schema.createTable('messages', (table) => {
    table.increments('id')
    table
      .integer('conversation_id')
      .unsigned()
      .references('id')
      .inTable('conversations')
      .onDelete('CASCADE')
      .index()
      .notNullable()
    table.string('sender_type').notNullable()
    table.text('message').notNullable()
    table.timestamps(true)
  })
}

public async down () {

  await this.schema.dropTableIfExists('messages')
  await this.schema.dropTableIfExists('conversations')
}
}
