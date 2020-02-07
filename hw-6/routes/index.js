const loginRoutes = require('./loginRoutes')
const taskRoutes = require('./tasksRoutes')

module.exports = function (app, db) {
   loginRoutes(app, db)
   taskRoutes(app, db)
}