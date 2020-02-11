const User = require('../models/user')
const passport = require('../auth')

module.exports = function (app, db) {

   // Production
   app.get('/', (req, res) => {
      const error = !!req.query.error
      res.render('sign_in', {error})
   })

   app.get('/sign_up', (req, res) => {
      res.render('sign_up')
   })

   app.post('/sign_up', async (req, res) => {
      const user = new User(req.body)
      await user.save()
      res.redirect('/')
   })

   app.post('/sign_in', passport.authenticate)
   
   app.get('/logout', (req, res) => {
      req.logout()
      res.redirect('/')
   })
   
   // Development
   app.get('/users', async (req, res) => {
      const users = await User.find()
      res.json(users)
   })

   app.delete('/users/:id', async (req, res) => {
      await User.findByIdAndDelete(req.params.id, (err, user) => {
         if (err) {
            console.log('error', err)
         }
         console.log(user, `has been deleted`)
      })
   })
}