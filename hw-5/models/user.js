const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
   name: {
      firstName: {type: String, default: 'Vasya'},
      lastName: {type: String, default: 'Pupkin'},
   },
   avatar: String,
   email: String,
   bio: String, 
   tasks: { 
      type: Schema.Types.ObjectId, 
      ref: 'Task'
  },
})

module.exports = mongoose.model('User', userSchema, 'users')