import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    req.user = user
    next()
  })
}