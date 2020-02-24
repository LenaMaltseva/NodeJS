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

// Get one task
router.get('/:id', async (req, res) => {
   const task = await Task.findById(req.params.id)
   res.json(task)
})

// Create new task
router.post('/', async (req, res) => {
   const task = new Task(req.body)
   const newTask = await task.save()
   res.json(newTask)
})

// Update task, full
router.put('/:id', async (req, res) => {
   const task = await Task.findByIdAndUpdate(req.params.id, req.body)
   res.json(task)
})

// Update task, partial
router.patch('/:id', async (req, res) => {
   const task = await Task.findByIdAndUpdate(req.params.id, {$set: req.body})
   res.json(task)
})

// Delete task
router.delete('/:id', async (req, res) => {
   const task = await Task.findByIdAndRemove(req.params.id)
   res.json(task)
})

module.exports = router