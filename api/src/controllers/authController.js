import jwt from 'jsonwebtoken'
import md5 from 'md5'
import dotenv from 'dotenv'

import User from '../models/userModel.js'

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res) => {
  try {

    const { email, password } = req.body;

    // kiem tra xem nguoi dung da ton tai chua
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // tao nguoi dung moi
    const user = await User.create({
      email: email,
      password: md5(password)
    });

    res.status(201).json({ user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // xac thuc nguoi dung
    const user = await User.findOne({
      email: email,
      password: md5(password)
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // tao token
    const token = jwt.sign({ email: user.email }, SECRET_KEY);
    return res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
