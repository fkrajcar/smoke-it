import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#FF5500', dark: '#E14A00', light: '#FF7D00' },
    secondary: { main: '#FF6900' },
    success: { main: '#32d35a' },
    error: { main: '#ff002b' },
    light: { main: '#EBEFF3' },
    dark: { main: '#141616' },
    background: { default: '#141616', light: '#323838', dark: '#0A0C0C' },
    text: { primary: '#fff', secondary: '#fff', disabled: '#fff' },
    divider: 'rgb(127,127,127)',
  },
  typography: {
    fontFamily: ['Play', 'sans-serif'].join(','),
  },
})

export default theme
