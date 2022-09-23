import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

const CountryContext = createContext(undefined)

const countries = [
  { name: 'argentina', code: 'AR' },
  { name: 'united states', code: 'US' },
  { name: 'spain', code: 'ES' },
  { name: 'brazil', code: 'BR' },
  { name: 'uruguay', code: 'UY' },
  { name: 'chile', code: 'CL' },
  { name: 'japan', code: 'JP' }
]

const defaultCountry = { name: 'argentina', code: 'AR' }

const CountryProvider = ({ children }) => {
  const router = useRouter()

  const [country, setCountry] = useState(
    () =>
      countries.find((country) => router.query.lang === country.code) ||
      defaultCountry
  )

  const value = {
    countries,
    country,
    setCountry
  }

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  )
}

const useCountry = () => {
  const context = useContext(CountryContext)
  if (context === undefined)
    throw new Error('useCountry must be used within a CountryProvider')
  return context
}

export { CountryProvider, useCountry }
