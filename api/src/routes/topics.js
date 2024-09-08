import express from 'express'
import { create, getAll, getDetail, getVocabulary } from '../controllers/topicsController.js'
import { authorization } from '../middeware/authMiddeware.js'

const router = express.Router()

router.get('/', authorization, getAll)

router.get('/yourtopic/:id', authorization, getDetail)

router.get('/yourtopic/:id/practice', authorization, getVocabulary)

router.post('/create', authorization, create)


export default router