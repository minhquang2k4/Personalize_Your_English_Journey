import AccountComponent from '../components/authComponents/accountComponent.jsx'

import Box from '@mui/material/Box'

const AccountPage = () => {
  return (
    <Box sx={{
      padding: '13px',
      backgroundColor: '#f5f5f5'
    }}>
      <AccountComponent />
    </Box>
  )
}

export default AccountPage