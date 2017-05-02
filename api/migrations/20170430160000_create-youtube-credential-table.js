exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('youtube_credential', t => {
      t.integer('user_id').unsigned().references('user.id').primary()
      t.string('refresh_token', 191).notNull().unique()
      t.string('access_token', 191).notNull().unique()
      t.bigint('expiry_date').unsigned().notNull()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('youtube_credential')
  ])
}
