import { createTheme } from '@mui/material/styles'

//  color của nút trong Material-UI chỉ chấp nhận các giá trị mặc định như 
//primary, secondary, inherit, default, error, info, success, và warning.
const theme = createTheme({
  palette: {
    primary: {
      main: '#D500F9'
    },
    secondary: {
      main: '#42A5F5'
    }
  }
})


export default theme