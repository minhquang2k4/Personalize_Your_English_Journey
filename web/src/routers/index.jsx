import { Navigate } from 'react-router-dom'

import MainLayout from '../layouts/mainLayout'
import Login from '../pages/loginPage'
import Register from '../pages/registerPage'

import Home from '../pages/homePage'

export const routes = [
  {
    path: '/',
    element: <MainLayout />, // masterpage 
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />
      },
      {
        path: 'home',
        element: <Home />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]