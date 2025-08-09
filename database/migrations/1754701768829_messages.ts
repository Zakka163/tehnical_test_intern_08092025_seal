import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('sender_type').notNullable()
      table.text('message').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
