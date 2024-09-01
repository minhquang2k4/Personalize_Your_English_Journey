import { createTheme } from '@mui/material/styles'

//  color của nút trong Material-UI chỉ chấp nhận các giá trị mặc định như 
//primary, secondary, inherit, default, error, info, success, và warning.
const theme = createTheme({
  palette: {
  },
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme'
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536
    }
  }
})


export default theme