import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Outlet, useNavigate } from 'react-router-dom'

import theme from '../theme'

import HomeIcon from '@mui/icons-material/Home'
import TopicIcon from '@mui/icons-material/Topic'
import DescriptionIcon from '@mui/icons-material/Description'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'
import PersonSharpIcon from '@mui/icons-material/PersonSharp'
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import { useEffect, useMemo, useState } from 'react'

function DashboardLayoutBasic() {
  const isLogin = localStorage.getItem('islogin')
  const [pathname, setPathname] = useState('/home')
  const navigate = useNavigate()

  const NAVIGATION1 = [
    {
      kind: 'header',
      title: 'Home'
    },
    {
      segment: 'home',
      title: 'Trang Chủ',
      icon: <HomeIcon />
    },
    {
      kind: 'divider'
    },
    {
      kind: 'header',
      title: 'Topic'
    },
    {
      segment: 'topics',
      title: 'Chủ Đề',
      icon: <TopicIcon />
    },
    {
      kind: 'divider'
    },
    {
      kind: 'header',
      title: 'user'
    },
    {
      segment: 'auth',
      title: 'Người Dùng',
      icon: <AccountCircleIcon />,
      children: [
        {
          segment: 'account',
          title: 'Tài Khoản',
          icon: <PersonSharpIcon />
        },
        {
          segment: 'logout',
          title: 'Đăng Xuất',
          icon: <LogoutSharpIcon />
        }
      ]
    }
  ]

  const NAVIGATION2 = [
    {
      kind: 'header',
      title: 'Home'
    },
    {
      segment: 'home',
      title: 'Trang Chủ',
      icon: <HomeIcon />
    },
    {
      kind: 'divider'
    },
    {
      kind: 'header',
      title: 'Topic'
    },
    {
      segment: 'topic',
      title: 'Chủ Đề',
      icon: <TopicIcon />,
      children: [
        {
          segment: 'sales',
          title: 'Sales',
          icon: <DescriptionIcon />
        },
        {
          segment: 'traffic',
          title: 'Traffic',
          icon: <DescriptionIcon />
        }
      ]
    },
    {
      kind: 'divider'
    },
    {
      kind: 'header',
      title: 'user'
    },
    {
      segment: 'auth',
      title: 'Người Dùng',
      icon: <AccountCircleIcon />,
      children: [
        {
          segment: 'login',
          title: 'Đăng nhập',
          icon: <LoginIcon />
        },
        {
          segment: 'register',
          title: 'Đăng ký',
          icon: <AppRegistrationIcon />
        }
      ]
    }
  ]

  const NAVIGATION = isLogin ? NAVIGATION1 : NAVIGATION2

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path))
    }
  }, [pathname])

  useEffect(() => {    
    navigate(pathname)
  }, [pathname, navigate])
  
  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={theme}
      router={router}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'Personalize Your English Journey'
      }}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  )
}

export default DashboardLayoutBasic