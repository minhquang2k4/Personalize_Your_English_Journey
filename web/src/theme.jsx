// import { cyan, deepOrange, orange, red } from '@mui/material/colors'
import { lightBlue, purple } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.

//  color của nút trong Material-UI chỉ chấp nhận các giá trị mặc định như 
//primary, secondary, inherit, default, error, info, success, và warning.
const theme = createTheme({
  palette: {
    primary: lightBlue,
    secondary: purple
  }
})


export default theme