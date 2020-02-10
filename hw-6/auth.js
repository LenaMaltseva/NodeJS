const passport = require('passport')
const Strategy = require('passport-local').Strategy

const User = require('./models/user')

passport.use( new Strategy ( async (username, password, done) => {
   const user = await User.findOne({username})
   if (!user || !user.comparePassword(password)) {
      done(null, false)
   } else {
      const plainUser = JSON.parse(JSON.stringify(user))
      delete plainUser.password
      done(null, plainUser)   //req.user
   }
}))

passport.serializeUser( (user, done) => {
   return done(null, user._id)
})

passport.deserializeUser( async (id, done) => {
   const user = await User.findById(id)
   const plainUser = JSON.parse(JSON.stringify(user))
   delete plainUser.password
   done(null, plainUser)   //req.user
})

module.exports = {
   initialize: passport.initialize(),
   session: passport.session(),
   authenticate: passport.authenticate( 'local', {
      successRedirect: './tasks',
      failureRedirect: './sign_in?error=the-user-is-not-found'
   })
}