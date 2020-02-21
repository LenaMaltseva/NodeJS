const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const tasksRoutes = require('./tasks')

router.use('/auth', authRoutes)
router.use('/tasks', tasksRoutes)

module.exports = router