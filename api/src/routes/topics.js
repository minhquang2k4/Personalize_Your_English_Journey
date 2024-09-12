import express from 'express'
import { addVoca, create, createExam, getAll, getAllExam, getDetail, getExamDetail, getVocabulary } from '../controllers/topicsController.js'
import { authorization } from '../middeware/authMiddeware.js'

const router = express.Router()

router.get('/', authorization, getAll)

router.get('/yourtopic/:id', authorization, getDetail)

router.get('/yourtopic/:id/practice', authorization, getVocabulary)

router.get('/yourtopic/:id/createExam', authorization, createExam)

router.get('/yourtopic/:id/getAllExam', authorization, getAllExam)

router.get('/yourtopic/:id/:examId', authorization, getExamDetail)

router.post('/yourtopic/:id/addVoca', authorization, addVoca)

router.post('/create', authorization, create)

export default router