import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

const app = express()
dotenv.config()
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_SECRET}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('Connection to MongoDB failed'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use((req, res, next) => {
  console.log('Requête reçue')
  next()
})

app.use((req, res) => {
  console.log('Réponse envoyée avec succès')
})

export default app