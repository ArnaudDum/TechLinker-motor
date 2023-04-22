import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { Schema } = mongoose

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  pseudo: { type: String },
  date: { type: Date, required: true, default: new Date() },
  image: { type: String },
  projects: [Number],
  followers: [Number],
  following: [Number]
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

export default User