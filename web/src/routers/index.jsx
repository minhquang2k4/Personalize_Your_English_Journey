import { Navigate } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
// import DashboardLayoutBasic from '../layouts/test'
import LoginPage from '../pages/loginPage'
import RegisterPage from '../pages/registerPage'
import HomePage from '../pages/homePage'
import NewTopicPage from '../pages/NewTopicPage'
import AccountPage from '../pages/AccountPage'
import YourTopicPage from '../pages/YourTopicPage'

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
        path: 'topics/newtopic',
        element: <NewTopicPage />
      },
      {
        path: 'topics/yourtopic',
        element: <YourTopicPage />
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