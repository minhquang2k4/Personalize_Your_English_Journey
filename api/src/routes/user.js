import express from 'express'

import { authorization } from '../middeware/authMiddeware.js'
import { getDetailUser } from '../controllers/userController.js'
import { getHissoryPractice } from '../controllers/userController.js'


const router = express.Router()

router.get('/account', authorization, getDetailUser)

router.get('/historyPractice', authorization, getHissoryPractice)

export default router