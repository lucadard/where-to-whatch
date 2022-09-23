import { CountryProvider } from '../context/CountryContext'
import { ShowProvider } from '../context/ShowContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <CountryProvider>
      <ShowProvider>
        <Component {...pageProps} />
      </ShowProvider>
    </CountryProvider>
  )
}

export default MyApp
