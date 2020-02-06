const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema ({
   taskBody: String,
   created: {type: Date, default: Date.now()},
   deadline: Date,
   contractor: { 
      type: Schema.Types.ObjectId, 
      ref: 'User'
  },
  priority: {
     type: String, 
     enum: ['Low', 'Normal', 'High', 'First'], 
     required: [true, 'How important is this task?']} 
})

module.exports = mongoose.model('Task', taskSchema, 'tasks')