import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import * as dotenv from 'dotenv'

dotenv.config()

export const signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash
      })
      user.save()
        .then((returned) => {
          const { password, ...safeProperties } = returned._doc
          res.status(201).json({
            message: 'New user signed in',
            user: safeProperties,
            token: jwt.sign(
              { userId: safeProperties._id },
              process.env.TOKEN_SECRET,
              { expiresIn: '24h' }
            )
          })
        })
        .catch(() => res.status(400).json({ message: 'A user is already registered with this email' }))
    })
    .catch((error) => res.status(500).json({ error }))
}

export const login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: 'Email and / or password incorrect' })
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: 'Email and / or password incorrect' })
            } else {
              const { password, ...safeProperties } = user._doc
              console.log(safeProperties._id)
              res.status(200).json({
                user: safeProperties,
                token: jwt.sign(
                  { userId: safeProperties._id },
                  process.env.TOKEN_SECRET,
                  { expiresIn: '24h' }
                )
              })
            }
          })
          .catch((error) => res.status(500).json({ error }))
      }
    })
    .catch((error) => res.status(500).json({ error }))
}

export const getUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      const { password, ...safeProperties } = user._doc
      res.status(200).json(safeProperties)
    })
    .catch((error) => res.status(404).json({ message: 'User not found' }))
}