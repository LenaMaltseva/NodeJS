const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(12)

const userSchema = new Schema({
   username: { type: String, required: true },
   firstName: String,
   lastName: String,
   password: { type: String, required: true }, //bcrypt
})

userSchema.pre('save', (req, res, next) => {
   const hashPassword = bcrypt.hashSync(req.body.password, salt)
   this.password = hashPassword
   next()
})

// bcrypt.compareSync('input password', 'saved password')  // true/false

module.exports = mongoose.model('User', userSchema, 'users')