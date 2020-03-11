const Task = require('./models/task')

module.exports = function (io) {

   io.on('connection', (socket) => {
      console.log('someone has connected', socket.id)
   
      socket.on('addTask', async (newTask) => {
         await new Task(newTask).save()
   
         socket.broadcast.emit('updTaskList')
         socket.emit('updTaskList')
      })
   
      socket.on('completeTask', async (task) => {
         await Task.findByIdAndUpdate(task.id, {$set: task})
   
         socket.broadcast.emit('updTaskList')
         socket.emit('updTaskList')
      })
   
      socket.on('removeTask', async (taskId) => {
         await Task.findByIdAndRemove(taskId)
         
         socket.broadcast.emit('updTaskList')
         socket.emit('updTaskList')
      })
   
      socket.on('disconnect', () => {
         console.log('someone has disconnected')
      })
   })   
   
}