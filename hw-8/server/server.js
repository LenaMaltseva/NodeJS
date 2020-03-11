const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes')
const http = require('http')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(router)

// Server
const server = http.Server(app)
const port = 8000
server.listen(port, () => {
   console.log(`Server is listening on http://localhost:${port}`)
})

// SocketIO
const SocketIO = require('socket.io')
const io = require('./socket')(SocketIO(server))

// Database
const portDB = 32775
mongoose.connect(`mongodb://localhost:${portDB}/task-manager`, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false
}, 
(err) => {
   if (!err) {
      console.log('Database successfully connected')
   } else throw err
})