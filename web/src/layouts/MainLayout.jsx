import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'

const drawerWidth = 240

function MainLayout() {
  const navigate = useNavigate()
  const isLogin = useSelector((state) => state.auth.isLogin)
  const user = useSelector((state) => state.auth.user)

  const handleNavigation = (path) => {
    navigate(path)
  }


  const drawer = (
    <Box>
      <Toolbar />
      <SimpleTreeView>
        <Divider sx={{ mx: 2 }} />
        <TreeItem itemId="home" label="Trang chủ" onClick={() => { handleNavigation('/') }}/>
        <Divider sx={{ mx: 2 }} />
        <TreeItem itemId="topics" label="Chủ đề" onClick={() => { handleNavigation('/topics') }} />
        <Divider sx={{ mx: 2 }} />
        <TreeItem itemId="account" label="Tài khoản" >
          {isLogin ? (
            <TreeItem itemId="profile" label="Thông tin người dùng" onClick={() => { handleNavigation('/profile') }} />
          ) : (
            <TreeItem itemId="login" label="Đăng nhập" onClick={() => { handleNavigation('/login') }} />
          )}
        </TreeItem>
        <Divider sx={{ mx: 2 }} />
      </SimpleTreeView>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ 
        backgroundColor: '#D500F9',
        color: 'white',
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }} >
        <Toolbar>
          <Typography variant="h5" noWrap component="div" fontWeight="bold" sx={{ flexGrow: 1 }}>
            Personalize Your English Journey
          </Typography>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
            {isLogin ? `Xin chào, ${user.userName}` : 'Xin chào'}
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Drawer - Sidebar của bạn */}

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        {drawer}
      </Drawer>
      {/* Nội dung chính */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginLeft: { sm: `${drawerWidth}px` } }} // Thêm khoảng trống cho sidebar
      >
        <Toolbar /> {/* Khoảng trống cho AppBar */}
        <Outlet /> {/* Outlet sẽ render các tuyến đường con */}
      </Box>
    </Box>
  )
}

export default MainLayout