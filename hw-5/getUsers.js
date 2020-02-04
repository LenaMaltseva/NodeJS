const express = require ('express')
const mongoose = require('mongoose')
const User = require('./models/user')

const app = express()

// Middleware
app.use(express.json())

mongoose.connect('mongodb://localhost:32772/insta', {
   useNewUrlParser: true, 
   useUnifiedTopology: true,
   useFindAndModify: false
},
(err) => {
   if (!err) {
      console.log('Database successfully connected')
   } else throw err
})

app.listen(8000, () => {
   console.log('Server listens http://localhost:8000')
})

// CRUD
// CREATE
app.post('/users', async (req, res) => {
   const user = new User(req.body)
   const savedUser = await user.save(err => {
      if (!err) {
         console.log('New user successfully added')
      }
   })
   res.json(savedUser)
})

// READ
app.get('/users', async (req, res) => {
   const users = await User.find()
   res.json(users)
})

app.get('/users/:id', async (req, res) => {
   const user = await User.findById(req.params.id, (err, user) => {
      if (err) {
         res.send('The user is not found')
      }
      res.json(user)
   })
})

// UPDATE
app.put('/users/:id', async (req, res) => {
   const user = await User.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
         res.send('The user is not found')
      }
   })
   res.json(user)
})

// DELETE
app.delete('/users', async (req, res) => {
   const user = await User.findOneAndDelete(req.body, (err, user) => {
      if (err) {
         res.send('The user is not found')
      }
      res.send(`The user successfully deleted.\n${user}`)
   })
})

app.delete('/users/:id', async (req, res) => {
   const user = await User.findByIdAndDelete(req.params.id, (err, user) => {
      if (err) {
         res.send('The user is not found')
      }
      res.send(`The user successfully deleted.\n${user}`)
   })
})