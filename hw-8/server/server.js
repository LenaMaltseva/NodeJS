const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes')
const http = require('http')
// const SocketIO = require('socket.io')
// const path = require('path')

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
// const Task = require('./models/task')
// const io = SocketIO(server)
// io.on('connection', (socket) => {
//    console.log('someone has connected', socket.id)

//    socket.on('task', async(body) => {
//       const task = new Task(body)
//       const savedTask = await task.save()
      
//       socket.broadcast.emit('task', savedTask)
//       socket.emit('task', savedTask)
//    })

//    socket.on('disconnect', () => {
//       console.log('someone has disconnected')
//    })
// })


// Database
const portDB = 32775       // have to change after Mongo (re-)starting
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