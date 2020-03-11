const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const Task = require('../models/task')

// Check authorization
router.use('/', async (req, res, next) => {
   if (!req.headers.authorization) {
      return res.json({message: 'Token is required'})
   } else {
      const [type, token] = req.headers.authorization.split(' ')
      jwt.verify(token, 'the-most-secure-secret-phrase', (err, payload) => {
         if (err) {
            return res.json({message: 'Incorrect token'})
         }
         req.user = payload
         next()
      })
   }
})

// Get all tasks
router.get('/', async (req, res) => {
   const tasks = await Task.find()
   res.json(tasks)
})

module.exports = router