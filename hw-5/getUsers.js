const express = require ('express')
const mongoose = require('mongoose')
const User = require('./models/user')

const app = express()

mongoose.connect('mongodb://localhost:32772/insta', {
   useNewUrlParser: true, 
   useUnifiedTopology: true
})

// Routing
app.get('/users', async (req, res) => {
   const users = await User.find()
   res.json(users)
})

app.get('/users/:id', async (req, res) => {
   const user = await User.findById(req.params.id)
   res.json(user)
})

app.post('/users', async (req, res) => {
   const user = new User(req.body)
   const savedUser = await user.save()
   res.json(savedUser)
})

app.listen(8000, () => {
   console.log('Server listens http://localhost:8000')
})