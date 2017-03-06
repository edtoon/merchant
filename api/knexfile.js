module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  pool: {
    min: 1,
    max: 1
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
