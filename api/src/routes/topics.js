import express from 'express'
import { create } from '../controllers/topicsController.js'
import { authorization } from '../middeware/authMiddeware.js'

const router = express.Router()

router.post('/create', authorization, create) 

export default router