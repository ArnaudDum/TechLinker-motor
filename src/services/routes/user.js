import express from 'express'
import * as userController from '../controllers/user.js'

const router = express.Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/:id', userController.getUser)

export default router