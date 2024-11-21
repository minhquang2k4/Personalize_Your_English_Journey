import { useEffect, useMemo } from 'react'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import theme from '../theme'
import HomeIcon from '@mui/icons-material/Home'
import TopicIcon from '@mui/icons-material/Topic'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'
import PersonSharpIcon from '@mui/icons-material/PersonSharp'
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import InterestsIcon from '@mui/icons-material/Interests'

function MasterPage() {
  const isLogin = JSON.parse(localStorage.getItem('islogin'))
  // const [pathname, setPathname] = useState('/home')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Đặt giá trị mặc định cho 'mui-toolpad-mode' là 'light'
    localStorage.setItem('mui-toolpad-mode', 'light')

    const handleStorageChange = (event) => {
      if (event.key === 'mui-toolpad-mode' && event.newValue === 'dark') {
        localStorage.setItem('mui-toolpad-mode', 'light')
      }
    }

    // Thêm sự kiện lắng nghe 'storage'
    window.addEventListener('storage', handleStorageChange)

    // Cleanup sự kiện lắng nghe khi component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const NAVIGATION1 = [
    {
      kind: 'header',
      title: 'Home'
    },
    {
      segment: 'home',
      title: 'Trang Chủ',
      icon: <HomeIcon color='primary' />
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
      icon: <TopicIcon />,
      children: [
        {
          segment: 'newtopic',
          title: 'Tạo Chủ Đề',
          icon: <AddCircleOutlineIcon />
        },
        {
          segment: 'yourtopic',
          title: 'Chủ Đề Của Bạn',
          icon: <InterestsIcon />
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
          segment: 'account',
          title: 'Tài Khoản',
          icon: <PersonSharpIcon />
        },
        {
          segment: 'practicehistory',
          title: 'Lịch sử luyện Tập',
          icon: <InterestsIcon />
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
      segment: 'topics',
      title: 'Chủ Đề',
      icon: <TopicIcon />,
      children: [
        {
          segment: 'newtopic',
          title: 'Tạo Chủ Đề',
          icon: <AddCircleOutlineIcon />
        },
        {
          segment: 'yourtopic',
          title: 'Chủ Đề Của Bạn',
          icon: <InterestsIcon />
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
      pathname: location.pathname, 
      searchParams: new URLSearchParams(location.search),
      navigate: (path) => navigate(path)
    }
  }, [location, navigate])

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={theme}
      router={router}
      branding={{
        // logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'PERSONALIZE YOUR ENGLISH JOURNEY'
      }}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  )
}

export default MasterPage