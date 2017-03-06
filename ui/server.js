const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
// const loginHost = 'login.' + process.env.BASE_HOST

app.prepare().then(() => {
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

  server.get('/', (req, res) => {
//    if (req.session && req.session.userId && req.session.userId > 0) {
    return app.render(req, res, '/index', req.query)
//    } else {
//      res.redirect('//' + loginHost)
//    }
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(80, (err) => {
    if (err) {
      throw err
    }

    console.log('> Ready at http://' + process.env.HOST)
  })
})
