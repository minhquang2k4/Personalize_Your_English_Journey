import { Navigate } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
// import DashboardLayoutBasic from '../layouts/test'
import LoginPage from '../pages/loginPage'
import RegisterPage from '../pages/registerPage'
import HomePage from '../pages/homePage'
import TopicsPage from '../pages/TopicsPage'
import AccountPage from '../pages/AccountPage'

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
        element: <HomePage />
      },
      {
        path: 'topics',
        element: <TopicsPage />
      },
      {
        path: 'auth/account',
        element: <AccountPage />
      }
    ]
  },
  {
    path: '/auth/login',
    element: <LoginPage />
  },
  {
    path: '/auth/register',
    element: <RegisterPage />
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />
  }
]