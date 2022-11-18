import { createContext, useContext, useState, useEffect } from 'react'
import { setCookie } from 'cookies-next'

const ThemeContext = createContext(undefined)

const ThemeProvider = ({ loadedTheme, children }) => {
  const [theme, setTheme] = useState(loadedTheme || 'light')

  useEffect(() => {
    if (loadedTheme) return
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'

    setTheme(systemTheme)
    setCookie('theme', systemTheme)
  }, [loadedTheme])

  const value = {
    theme,
    toggleTheme: () => {
      const nextTheme = theme === 'light' ? 'dark' : 'light'
      setTheme(nextTheme)
      setCookie('theme', nextTheme)
    }
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')
  return context
}

export { ThemeProvider, useTheme }
