const Task = require('../models/task')

module.exports = function (app, db) {
   // READ
   app.get('/tasks', (req, res) => {
      res.send("Here will be user's tasks")
   })
}