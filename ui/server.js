import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import ms from 'ms'
import next from 'next'
import uuidV4 from 'uuid/v4'
import fetch from 'isomorphic-fetch'

import { apiHost, currentHost, loginHost } from 'gg-common/utils/hosts'

const allowedHosts = [currentHost]
const proto = process.env.BASE_HOST.endsWith('.local') ? 'http' : 'https'
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
const JWT_LENGTH = '12h'
const JWT_COOKIE_LENGTH = (ms(JWT_LENGTH) - 30000)

app.prepare().then(() => {
  const server = express()

  server.disable('x-powered-by')
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({
    extended: true
  }))
  server.use(cookieParser())
  server.use(morgan('combined'))

  server.get('/logout', (req, res) => {
    if (!req.headers || !req.headers.host || allowedHosts.indexOf(req.headers.host) < 0) {
      console.log('Invalid host header, redirecting to login')
      res.redirect(proto + '://' + loginHost())
    } else {
      res.writeHead(302, {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
        'Set-Cookie':
        'jwt=; ' +
        'Domain=' + req.headers.host + '; ' +
        (proto === 'https' ? 'Secure; ' : '') +
        'Expires=Thu, 01 Jan 1970 00:00:00 GMT; ' +
        'Version=1',
        Location: '/'
      })
      res.end()
    }
  })

  server.get('/auth', (req, res) => {
    if (!req.headers || !req.headers.host || allowedHosts.indexOf(req.headers.host) < 0) {
      console.log('Invalid host header, redirecting to login')
      res.redirect(proto + '://' + loginHost())
    } else if (!(req.query && req.query.token)) {
      console.log('No token, redirecting to /')
      res.redirect('/')
    } else {
      console.log('Verifying auth token')

      jwtVerify(req.query.token, 'GGAuthSecret', (err, decoded) => {
        if (!err && decoded.sub && decoded.sub === ('' + parseInt(decoded.sub, 10)) && decoded.aud && decoded.aud.length > 0 && decoded.aud.indexOf(proto + '://' + currentHost) > -1) {
          const uuid = uuidV4()
          const issuer = proto + '://' + currentHost
          const audience = [proto + '://' + apiHost()]

          console.log('Valid auth token, signing UI token')

          jwtSign(
            {
              tk: decoded.jti
            },
            'GGUiSecret',
            {
              algorithm: 'HS512',
              audience,
              issuer,
              jwtid: uuid,
              subject: decoded.sub,
              expiresIn: JWT_LENGTH
            },
            (error, token) => {
              if (error) {
                console.log('JWT error: ', error)
                res.status(400)
                res.send('Failed to generate access token')
              } else {
                fetch(proto + '://' + apiHost() + '/claim', {
                  method: 'POST',
                  headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include'
                })
                  .then(fetchResponse => {
                    if (fetchResponse.ok) {
                      res.writeHead(302, {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        Pragma: 'no-cache',
                        Expires: 0,
                        'Set-Cookie':
                        'jwt=' + encodeURIComponent(token) + '; ' +
                        'Domain=.' + req.headers.host + '; ' +
                        (proto === 'https' ? 'Secure; ' : '') +
                        'Expires=' + (new Date(Date.now() + JWT_COOKIE_LENGTH)).toUTCString() + '; ' +
                        'Version=1',
                        Location: '/'
                      })
                      res.end()
                    } else {
                      fetchResponse.text().then(text => {
                        console.log('Redirecting to login after bad response from claim: ', text)
                        res.redirect(proto + '://' + loginHost())
                      })
                    }
                  })
                  .catch(error => {
                    console.log('Redirecting to login after error fetching claim: ', error)
                    res.redirect(proto + '://' + loginHost())
                  })
              }
            }
          )
        } else {
          console.log('Invalid auth token, redirecting to login')
          res.redirect(proto + '://' + loginHost())
        }
      })
    }
  })

  server.get('*', (req, res) => {
    if (req.originalUrl.startsWith('/_')) {
      return handle(req, res)
    } else if (!(req.cookies && req.cookies.jwt)) {
      res.redirect(proto + '://' + loginHost())
    } else {
      jwtVerify(req.cookies.jwt, 'GGUiSecret', (err, decoded) => {
        if (!err && decoded.sub && decoded.sub === ('' + parseInt(decoded.sub, 10)) && decoded.iss && decoded.iss === (proto + '://' + currentHost)) {
          return handle(req, res)
        } else {
          console.log('Bad token, redirecting to login')
          res.redirect(proto + '://' + loginHost())
        }
      })
    }
  })

  server.listen(80, (err) => {
    if (err) {
      throw err
    }

    console.log('> Ready at http://' + process.env.HOST)
  })
})
