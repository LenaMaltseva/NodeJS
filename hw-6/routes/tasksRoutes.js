const Task = require('../models/task')

module.exports = function (app, db, passport) {

   // Production
   app.get('/tasks', async (req, res) => {
      const tasks = await Task.find({author: req.user._id})
      res.render('tasks', {
         user: req.user, 
         priority: ['Low', 'Normal', 'High', 'First'], 
         tasks: tasks.map(task => task.toJSON())
      })
   })

   app.post('/tasks', async (req, res) => {
      const task = new Task(req.body)
      await task.save()
      res.redirect('/tasks')
   })

   app.post('/tasks/complete', async (req, res) => {
      await Task.findOneAndUpdate({_id: req.body.complete}, {completed: true}, (err) => {
         if (err) {
            throw err
         }
         res.redirect('/tasks')
      })
   })
   
   app.post('/tasks/delete', async (req, res) => {
      await Task.findOneAndDelete({_id: req.body.delete}, (err, task) => {
         if (err) {
            throw err
         }
         res.redirect('/tasks')
      })
   })

   // Development
   app.get('/tasks-db', async (req, res) => {
      const tasks = await Task.find()
      res.json(tasks)
   })
   app.delete('/tasks/:id', async (req, res) => {
      await Task.findByIdAndDelete(req.params.id, (err, task) => {
         if (err) {
            console.log('error', err)
         }
         console.log(task, 'has been deleted')
         res.send('completed')
      })
   })
}