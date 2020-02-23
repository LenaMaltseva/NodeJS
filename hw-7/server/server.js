const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(router)

// Server
const port = 8000
app.listen(port, () => {
   console.log(`Server is listening on http://localhost:${port}`)
})

// Database
mongoose.connect('mongodb://localhost:32774/to-do-list', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false
}, 
(err) => {
   if (!err) {
      console.log('Database successfully connected')
   } else throw err
})