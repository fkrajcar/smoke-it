import '../styles/globals.scss'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SmokeIt</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
