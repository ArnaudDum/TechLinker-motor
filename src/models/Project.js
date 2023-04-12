import mongoose from 'mongoose'

const { Schema } = mongoose

const projectSchema = new Schema({
  author: { type: String, required: true},
  date: { type: Date, required: true, default: new Date() },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  categories: { type: [Number], required: true },
  skills: { type: [Number], required: true },
  neededSkills: { type: [Number], required: true },
  stars: [Number]
})

const Project = mongoose.model('Project', projectSchema)

export default Project