import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import bcrypt from 'bcrypt'
import uuidV4 from 'uuid/v4'
import Knex from 'knex'
import validateUuid from 'uuid-validate'

import { currentHost, uiHost } from 'gg-common/utils/hosts'
import { randomInt, unixTimestamp } from 'gg-common/utils/lang'

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

const jwtAuthenticatedRequest = (req, res, onSuccess) => {
  if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    console.log('Missing authorization in headers', req.headers)
    res.status(400)
    res.send('Missing authentication')
  } else {
    const jwt = req.headers.authorization.substr(7)
    const isMobile = (req.headers['user-agent'] && req.headers['user-agent'].startsWith('GG-Native-App/'))
    const secret = (isMobile ? 'GGAuthSecret' : 'GGUiSecret')

    jwtVerify(jwt, secret, (jwtError, decodedJwt) => {
      let uuid = null

      if (!jwtError && decodedJwt.aud && decodedJwt.aud.length > 0 && decodedJwt.sub && decodedJwt.sub === ('' + parseInt(decodedJwt.sub, 10)) && decodedJwt.iss && decodedJwt.jti && validateUuid(decodedJwt.jti, 4)) {
        if (isMobile) {
          if (decodedJwt.aud.indexOf('native') === 0 && decodedJwt.iss === (proto + '://' + currentHost)) {
            uuid = decodedJwt.jti
          }
        } else if (decodedJwt.aud.indexOf(proto + '://' + currentHost) > -1 && decodedJwt.iss === (proto + '://' + uiHost()) && decodedJwt.tk && validateUuid(decodedJwt.tk, 4)) {
          uuid = decodedJwt.tk
        }
      }

      if (!uuid) {
        res.status(400)
        res.send('Invalid token')
      } else {
        onSuccess(decodedJwt, uuid)
      }
    })
  }
}

const mockAlerts = [
  { title: '$40+ Profit Per Ladies Shirts', category: 'BOLO', location: 'Ross In-Store' },
  { title: '75% Off Store-Wide', category: 'Sale', location: 'Goodwill Outlet' },
  { title: '45% Off Fragrances, $80+ Profit', category: 'Clearance', location: 'Armani Exchange' },
  { title: 'Blue Light Special: DVDs', category: 'Sale', location: 'K-Mart' },
  { title: '3rd-Party Ink 40% Off', category: 'Sponsored', location: 'InkHero.com' }
]
const fortyEightHours = (60 * 60 * 24 * 2)

server.get('/alerts', (req, res) => {
  jwtAuthenticatedRequest(req, res, (decodedJwt) => {
    const currentTime = unixTimestamp()
    let alertCount = randomInt(3, 24)
    let alerts = []

    for (let i = 0; i < alertCount; i++) {
      const alert = {
        ...mockAlerts[randomInt(0, mockAlerts.length - 1)]
      }

      alert.timestamp = randomInt((currentTime - fortyEightHours), currentTime)

      if (alert.location !== 'InkHero.com') {
        alert.destination = {
          latitude: 37.4843428,
          longitude: -122.14839939999999,
          title: 'Facebook HQ',
          description: '1 Hacker Way, Menlo Park, CA 94025'
        }
      }

      alerts[i] = alert
    }

    alerts.sort((a, b) => {
      return b.timestamp - a.timestamp
    })

    res.json({alerts})
  })
})

server.options('/claim', cors(loginCorsOptions))
server.post('/claim', cors(loginCorsOptions), (req, res) => {
  jwtAuthenticatedRequest(req, res, (decodedJwt, uuid) => {
    knex.select(['id']).from('auth_ticket').where({
      'user_id': decodedJwt.sub,
      uuid: knex.raw('UNHEX(REPLACE("' + uuid + '","-",""))')
    })
      .then(rows => {
        if (!rows || rows.length !== 1) {
          res.status(400)
          res.send('No ticket found')
        } else {
          let data = rows[0]

          knex('auth_ticket_claim').insert({
            auth_ticket_id: data.id,
            claimed_at: knex.raw('UNIX_TIMESTAMP()')
          })
            .then(() => {
              res.status(200)
              res.send('OK')
            })
            .catch(error => {
              console.log('Insert error: ', error)
              res.status(400)
              res.send('Failed to claim authentication ticket')
            })
        }
      })
      .catch(error => {
        console.log('Query error: ', error)
        res.status(400)
        res.send('Error occurred')
      })
  })
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
              const isMobile = (req.headers && req.headers['user-agent'] && req.headers['user-agent'].startsWith('GG-Native-App/'))
              const audience = [isMobile ? 'native' : (proto + '://' + uiHost())]

              jwtSign(
                {},
                'GGAuthSecret',
                {
                  algorithm: 'HS512',
                  audience,
                  issuer,
                  jwtid: uuid,
                  subject: '' + data.id,
                  expiresIn: (isMobile ? '7d' : '30s')
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
        res.send('Error occurred')
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
        res.send('Error occurred')
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
