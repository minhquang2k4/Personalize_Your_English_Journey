import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

import connect from './config/database.js'
import router from './routes/index.js'

const app = express()

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cors
app.use(cors())

// router
app.use(router)

// connect to db
connect(MONGODB_URL)

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});