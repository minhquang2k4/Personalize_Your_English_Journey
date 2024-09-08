import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    Cookies.remove('token')
    localStorage.removeItem('userName')
    localStorage.setItem('islogin', false)
    navigate('/home')
  }, [navigate])

  return null
}

export default Logout