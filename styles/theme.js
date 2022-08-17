import { lightGreen, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#FF5500' },
    secondary: { main: '#FF7D00' },
    success: { main: lightGreen[500] },
    error: { main: red[500] },
    light: { main: '#EBEFF3' },
    dark: { main: '#141616' },
  },
})

export default theme
