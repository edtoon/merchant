import { sign as jwtSign } from 'jsonwebtoken'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import bcrypt from 'bcrypt'
import uuidV4 from 'uuid/v4'
import Knex from 'knex'

import { currentHost, uiHost } from 'gg-common/utils/hosts'

const knex = Knex({
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
const proto = process.env.BASE_HOST.endsWith('.local') ? 'http' : 'https'
const loginWhitelist = [ proto + '://login.' + process.env.BASE_HOST ]
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
server.use(morgan('combined'))

server.options('/login', cors(loginCorsOptions))
server.post('/login', cors(loginCorsOptions), (req, res) => {
  if (!req.body.username) {
    res.status(400)
    res.send('No username supplied')
  } else if (!req.body.password) {
    res.status(400)
    res.send('No password supplied')
  } else {
    knex.select(['id', 'name', 'password']).from('user').where('name', req.body.username)
      .then(rows => {
        if (!rows || rows.length !== 1) {
          res.status(400)
          res.send('No user found')
        } else {
          let data = rows[0]

          bcrypt.compare(req.body.password, data.password.toString('utf-8'), (error, result) => {
            if (result) {
              const uuid = uuidV4()
              const issuer = proto + '://' + currentHost
              const audience = [proto + '://' + uiHost()]

              jwtSign(
                {},
                'GGAuthSecret',
                {
                  algorithm: 'HS512',
                  audience,
                  issuer,
                  jwtid: uuid,
                  subject: '' + data.id,
                  expiresIn: '30s'
                },
                (error, token) => {
                  if (error) {
                    console.log('JWT error: ', error)
                    res.status(400)
                    res.send('Failed to generate authentication token')
                  } else {
                    knex('auth_ticket').insert({
                      user_id: data.id,
                      uuid: knex.raw('UNHEX(REPLACE("' + uuid + '","-",""))'),
                      created_at: knex.raw('UNIX_TIMESTAMP()')
                    })
                      .then(() => {
                        res.json({token})
                      })
                      .catch(error => {
                        console.log('Insert error: ', error)
                        res.status(400)
                        res.send('Failed to store authentication ticket')
                      })
                  }
                }
              )
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
    knex.select(knex.raw('1')).from('user').where('name', req.body.username)
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
              knex('user').insert({name: req.body.username, password: bcryptHash})
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

server.get('/', (req, res) => {
  res.status(200)
  res.send('Request received by ' + currentHost + '!')
})

server.listen(80, (err) => {
  if (err) {
    throw err
  }

  console.log('> Ready at http://' + process.env.HOST)
  console.log('CORS: ', loginWhitelist)
})
