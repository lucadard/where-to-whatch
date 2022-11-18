import { getCookie } from 'cookies-next'

import { ThemeProvider } from '../context/ThemeContext'
import { CountryProvider } from '../context/CountryContext'
import { ShowProvider } from '../context/ShowContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps, theme }) {
  return (
    <ThemeProvider loadedTheme={theme}>
      <CountryProvider>
        <ShowProvider>
          <Component {...pageProps} />
        </ShowProvider>
      </CountryProvider>
    </ThemeProvider>
  )
}

export default MyApp

MyApp.getInitialProps = ({ ctx }) => ({ theme: getCookie('theme', ctx) })
