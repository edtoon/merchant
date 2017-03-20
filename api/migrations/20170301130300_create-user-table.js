exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', t => {
    t.increments('id').unsigned().primary()
    t.string('name', 191).notNull().unique()
    t.binary('password', 60).notNull()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user')
}
