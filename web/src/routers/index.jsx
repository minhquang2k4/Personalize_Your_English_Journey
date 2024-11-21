import { Navigate } from 'react-router-dom'

import MasterPage from '../layouts/MainLayout'
import LoginPage from '../pages/loginPage'
import RegisterPage from '../pages/registerPage'
import HomePage from '../pages/homePage'
import NewTopicPage from '../pages/NewTopicPage'
import AccountPage from '../pages/AccountPage'
import YourTopicPage from '../pages/YourTopicPage'
import DetailTopicPage from '../pages/DetailTopicPage'
import PracticeTopicPage from '../pages/practiceTopicPage'
import ExamTopicPage from '../pages/examTopicPage'
import DetailExamPage from '../pages/DetailExamPage'
import HistoryExamPage from '../pages/HistoryExamPage'
import HistoryExamDetailPage from '../pages/HistoryExamDetailPage'
import HistoryPracticePage from '../pages/HistoryPracticePgae'

import Logout from '../components/authComponents/logoutComponent'

export const routes = [
  {
    path: '/',
    element: <MasterPage />, // masterpage 
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
        path: 'topics/yourtopic/:id',
        element: <DetailTopicPage />
      },
      {
        path: 'topics/yourtopic/:id/practice',
        element: <PracticeTopicPage />
      },
      {
        path: 'topics/yourtopic/:id/exam',
        element: <ExamTopicPage />
      },
      {
        path: 'topics/yourtopic/:id/exam/:examID',
        element: <DetailExamPage />
      },
      {
        path: 'topics/yourtopic/:id/exam/:examID/history',
        element: <HistoryExamPage />
      },
      {
        path: 'topics/yourtopic/:id/exam/:examID/history/:historyID',
        element: <HistoryExamDetailPage />
      },
      {
        path: 'topics/yourtopic',
        element: <YourTopicPage />
      },
      {
        path: 'auth/account',
        element: <AccountPage />
      },
      {
        path: 'auth/practicehistory',
        element: <HistoryPracticePage />
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
    path: '/auth/logout',
    element: <Logout />
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />
  }
]