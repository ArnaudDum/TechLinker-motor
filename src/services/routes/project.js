import express from 'express'
import * as projectController from '../controllers/project.js'
import { auth } from '../../middleware/auth.js'

const router = express.Router()

router.post('/', auth, projectController.createProject)
router.get('/', auth, projectController.getAllProjects)

export default router