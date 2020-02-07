const express = require('express')
const mongoose = require('mongoose')
const consolidate = require('consolidate')
const path = require('path')

const app = express()

// Middleware
app.use(express.json())
app.use('/styles', express.static(path.resolve(__dirname, 'assets/css')))

// Handlebars
app.engine('hbs', consolidate.handlebars)
app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, 'views'))

// Server
const port = 8000
app.listen(port, () => {
   console.log(`Server listens on http://localhost:${port}`)
})

// Database
const db = mongoose.connect('mongodb://localhost:32768/to-do-list', {
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