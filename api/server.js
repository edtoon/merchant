const express = require('express')
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const knex = require('knex')({
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
    max: 5
  }
})
const loginWhitelist = [ 'http://login.' + process.env.BASE_HOST ]
const loginCorsOptions = (req, callback) => {
  let corsOptions
  if (loginWhitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true, credentials: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}
const server = express()

server.disable('x-powered-by')
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: true
}))
server.use(session({
  name: 'gg-merchant-app',
  secret: 'This is not so secret, is it!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    domain: '.' + process.env.BASE_HOST
  }
}))

server.get('/logout', (req, res) => {
  if (req.session && req.session.userId) {
    req.session.userId = null
  }

  res.redirect('/')
})

server.options('/login', cors(loginCorsOptions))
server.post('/login', cors(loginCorsOptions), (req, res) => {
  if (!req.body.username) {
    res.status(400)
    res.send('No username supplied')
  } else if (!req.body.password) {
    res.status(400)
    res.send('No password supplied')
  } else {
    knex.select(['id', 'name', 'password']).from('users').where('name', req.body.username)
      .then(rows => {
        console.log('Result: ', rows)

        if (!rows || rows.length !== 1) {
          res.status(400)
          res.send('No user found')
        } else {
          let data = rows[0]

          bcrypt.compare(req.body.password, data.password.toString('utf-8'), (error, result) => {
            if (result) {
              req.session.userId = data.id
              res.send('Login succeeded')
            } else {
              if (error) {
                console.log('Bcrypt error: ', error)
              }

              res.status(400)
              res.send('Login failed')
            }
          })
        }
      })
      .catch(error => {
        console.log('Query error: ', error)
        res.status(400)
        res.send('Error occured')
      })
  }
})

server.options('/register', cors(loginCorsOptions))
server.post('/register', cors(loginCorsOptions), (req, res) => {
  if (!req.body.username) {
    res.status(400)
    res.send('No username supplied')
  } else if (!req.body.password) {
    res.status(400)
    res.send('No password supplied')
  } else {
    knex.select(knex.raw('1')).from('users').where('name', req.body.username)
      .then(rows => {
        if (rows && rows.length === 1) {
          res.status(400)
          res.send('User already exists')
        } else {
          bcrypt.hash(req.body.password, 10, (bcryptError, bcryptHash) => {
            if (!bcryptHash) {
              res.status(400)
              res.send('Failed to encrypt password')
            } else if (bcryptError) {
              console.log('Bcrypt error: ', bcryptError)
              res.status(400)
              res.send('Error encrypting password')
            } else {
              knex('users').insert({name: req.body.username, password: bcryptHash})
                .then(() => {
                  res.send('Registration succeeded')
                })
                .catch(error => {
                  console.log('Insert error: ', error)
                  res.status(400)
                  res.send('Registration failed')
                })
            }
          })
        }
      })
      .catch(error => {
        console.log('Query error: ', error)
        res.status(400)
        res.send('Error occured')
      })
  }
})

server.listen(80, (err) => {
  if (err) {
    throw err
  }

  console.log('> Ready at http://' + process.env.HOST)
  console.log('CORS: ', loginWhitelist)
})
