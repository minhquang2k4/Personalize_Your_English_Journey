// import { cyan, deepOrange, orange, red } from '@mui/material/colors'
import { lime, purple, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.

//  color của nút trong Material-UI chỉ chấp nhận các giá trị mặc định như 
//primary, secondary, inherit, default, error, info, success, và warning.
const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
    haha: red // sẽ không hoạt động trong color của nút
  }
})


export default theme