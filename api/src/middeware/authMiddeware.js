import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY

export const authorization = (req, res, next) => {
  const authHeader = req.headers['authorization']
  let token = authHeader?.split(' ')[1] // Lấy token từ header
  
  if (!token || token === 'undefined') {
    console.log("🚀 ~ No token provided")
    return res.status(401).json({ message: 'Unauthorized: No token provided.' })
  }

  console.log("🚀 ~ Token found, verifying...")

  // Kiểm tra tính hợp lệ của token với SECRET_KEY
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("🚀 ~ Token verification failed:", err)
      return res.status(403).json({ message: 'Forbidden: Invalid or expired token.' })
    }
    req.user = decoded // Lưu thông tin người dùng vào request
    next() // Chuyển tiếp đến middleware hoặc route handler tiếp theo
  })
}