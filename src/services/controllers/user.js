import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'

export const signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash
      })
      user.save()
        .then(() => res.status(201).json({ message: 'New user signed in' }))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
