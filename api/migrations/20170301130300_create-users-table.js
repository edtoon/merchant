exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', t => {
    t.increments('id').unsigned().primary()
    t.string('name', 191).notNull()
    t.binary('password', 60).notNull()
    t.unique('name')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
