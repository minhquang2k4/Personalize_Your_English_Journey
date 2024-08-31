import jwt from 'jsonwebtoken'
import md5 from 'md5'
import dotenv from 'dotenv'
dotenv.config()

import User from '../models/userModel.js'

const SECRET_KEY = process.env.SECRET_KEY

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body

    if ( firstName === '' || lastName === '' || email === '' || password === '' ) {
      return res.status(400).json({ message: 'Please fill in all fields' })
    }
    const fullName = `${firstName} ${lastName}`

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password does not match' })
    }

    // kiem tra xem nguoi dung da ton tai chua
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    // tao nguoi dung moi
    const user = await User.create({
      userName: fullName,
      email: email,
      password: md5(password)
    })

    res.status(201).json({ user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (email === '' || password === '') {
      return res.status(400).json({ message: 'Please fill in all fields' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const user = await User.findOne({
      email: email,
      password: md5(password)
    })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const userInformation = {
      userName: user.userName,
      email: user.email
    }

    const token = jwt.sign({ email: email }, SECRET_KEY)
    return res.status(201).json({ token, user: userInformation })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
