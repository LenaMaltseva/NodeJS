const User = require('../models/user')

module.exports = function (app, db) {
   // READ
   app.get('/', (req, res) => {
      res.send('Here will be signIn / signUp form')
   })
}