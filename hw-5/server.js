const express = require ('express')
const mongoose = require('mongoose')

const app = express()

// Middleware
app.use(express.json())

// Server
const port = 8000
app.listen(port, () => {
   console.log(`Server listens http://localhost:${port}`)
})

// Database
const db = mongoose.connect('mongodb://localhost:32769/insta', {
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