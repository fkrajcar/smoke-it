import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#FF5500', dark: '#E14A00', light: '#FF7D00' },
    secondary: { main: '#FF6900' },
    success: { main: '#32d35a' },
    error: { main: '#ff002b' },
    background: { default: '#141616', paper: '#323838' },
    text: { primary: '#fff', secondary: '#fff', disabled: '#fff' },
    divider: 'rgb(127,127,127)',
  },
  typography: {
    fontFamily: ['Play', 'sans-serif'].join(','),
  },
})

export default theme
