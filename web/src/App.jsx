// import { useDispatch, useSelector } from 'react-redux'
// import { Button } from '@mui/material'
// import DeleteIcon from '@mui/icons-material/Delete';

// action 
// import { LOGIN, LOGOUT } from './redux/slices/authSlice'

// function App() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user) // Lấy giá trị từ Redux store

//   const handleClick = () => {
//     console.log('click')
//     dispatch(LOGIN({ name: 'John Doe' }))
//   }

//   const logout = () => {
//     dispatch(LOGOUT())
//   }

//   return (
//     <>
//       <Button variant="contained" onClick={handleClick}>
//         Primary Button
//       </Button>
//       {user && <div>User: {user.name}</div>} {/* Hiển thị giá trị từ Redux store */}
//       <Button variant="contained" onClick={logout}
//         sx={{
//           backgroundColor: 'blueGrey',
//           color: 'white',
//           '&:hover': {
//             backgroundColor: 'orange'
//           }
//         }}
//       >
//         Logout
//       </Button>
//     </>
//   )
// }
import RouterProvider from './routers/RouterProvider'
import Loader from './components/loader'

function App() {
  return (
    <>
      <RouterProvider />
      <Loader />
    </>
  )
}

export default App