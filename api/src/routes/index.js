import express from 'express'
import authRouter from './auth.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('api is working')
})

router.use('/auth', authRouter)

export default router