import { createContext, useContext, useState } from 'react'

const CountryContext = createContext(undefined)

const CountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState('AR')
  const value = { selectedCountry, setSelectedCountry }
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
