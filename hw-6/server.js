const express = require('express')
const mongoose = require('mongoose')
const consolidate = require('consolidate')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./auth')
// const cookieSession = require('cookie-session')

const app = express()

const mustBeAuthenticate = (req, res, next) => {
   if (req.user) {
      next()
   } else {
      res.redirect('/')
   }
}

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/styles', express.static(path.resolve('hw-6', 'assets/css')))
app.use('/images', express.static(path.resolve('hw-6', 'assets/img')))
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'secret phrase', // ключ
  store: new MongoStore({mongooseConnection: mongoose.connection}),
}))
app.use(passport.initialize)
app.use(passport.session)
app.use('/tasks', mustBeAuthenticate)
// app.use(cookieSession({
//    name: 'remember_me',
//    keys: [/* secret keys */],
//    maxAge: 3600 * 24 * 7 * 1000 //one week
// }))

// Handlebars
app.engine('hbs', consolidate.handlebars)
app.set('view engine', 'hbs')
app.set('views', path.resolve('hw-6', 'views'))

// Server
const port = 8000
app.listen(port, () => {
   console.log(`Server listening on http://localhost:${port}`)
})

// Database
const db = mongoose.connect(`mongodb://localhost:32771/to-do-list`, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false
},
(err) => {
   if (!err) {
      console.log('Database successfully connected')
   } else throw err
})

// Routing
require('./routes/')(app, db)