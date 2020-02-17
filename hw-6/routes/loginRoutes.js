const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('../auth')

router.get('/', (req, res) => {
   const error = !!req.query.error
   res.render('sign_in', {error})
})

router.get('/sign_up', (req, res) => {
   res.render('sign_up')
})

router.post('/sign_up', async (req, res) => {
   const user = new User(req.body)
   await user.save()
   res.redirect('/')
})

router.post('/sign_in', passport.authenticate)

router.get('/logout', (req, res) => {
   req.logout()
   res.redirect('/')
})

module.exports = router