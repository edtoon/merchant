exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('auth_ticket', t => {
      t.bigIncrements('id').unsigned().primary()
      t.integer('user_id').unsigned().references('user.id')
      t.binary('uuid', 16).notNull().unique()
      t.bigint('created_at').unsigned().notNull()
    }),
    knex.schema.createTable('auth_ticket_claim', t => {
      t.bigint('auth_ticket_id').unsigned().primary().references('auth_ticket.id')
      t.bigint('claimed_at').unsigned().notNull()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auth_ticket_claim'),
    knex.schema.dropTable('auth_ticket')
  ])
}
