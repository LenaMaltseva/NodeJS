const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user')

// Create an account
router.post('/sign_up', async (req, res) => {
   const { username } = req.body
   let user = await User.findOne({username})
   if (!user) {
      user = new User(req.body)
      const newUser = await user.save()
      const plainUser = JSON.parse(JSON.stringify(newUser))
      delete plainUser.password
      return res.json({
         _id: plainUser._id,
         username: plainUser.username,
         token: jwt.sign(plainUser, 'the-most-secure-secret-phrase')
      })
   } else {
      return res.json({message: 'Username is already taken'})
   }
})

// Login
router.post('/sign_in', async (req, res) => {
   const { username, password } = req.body
   const user = await User.findOne({username})
   if (!user) {
      return res.json({message: 'Incorrect username'})
   }
   if (!user.comparePassword(password)) {
      return res.json({message: 'Incorrect password'})
   }
   const plainUser = JSON.parse(JSON.stringify(user))
   delete plainUser.password
   res.json({
      _id: plainUser._id,
      username: plainUser.username,
      token: jwt.sign(plainUser, 'the-most-secure-secret-phrase')
   })
})

// Get user
router.get('/:id', async (req, res) => {
   const user = await User.findById(req.params.id)
   res.json(user)
})

module.exports = router