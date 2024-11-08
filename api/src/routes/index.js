import express from 'express'
import authRouter from './auth.js'
import topicsRouter from './topics.js'
import userRouter from './user.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('api is working')
})

router.use('/auth', authRouter)
router.use('/topics', topicsRouter)
router.use('/user', userRouter)

export default router