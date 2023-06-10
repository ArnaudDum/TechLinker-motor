import express from 'express'
import * as userController from '../controllers/user.js'
import { auth } from '../../middleware/auth.js'

const router = express.Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/:id', userController.getUser)
router.post('/:id', auth, userController.updateUser)

export default router