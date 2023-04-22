import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import userRouter from './services/routes/user.js'
import projectRouter from './services/routes/project.js'

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

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

export default app