import express from 'express'
import authRouter from './auth.js'
import topicsRouter from './topics.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('api is working')
})

router.use('/auth', authRouter)
router.use('/topics', topicsRouter)

export default router