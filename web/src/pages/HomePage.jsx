import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to='/register'>register</Link>
    </div>
  )
}

export default HomePage
