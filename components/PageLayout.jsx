import React from 'react'
import Head from 'next/head'
import useTitle from '../hooks/useTitle'
import { useTheme } from '../context/ThemeContext'

const PageLayout = ({ children }) => {
  const { title } = useTitle()
  const { theme } = useTheme()
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main
        className={`h-screen
        ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}
      >
        {children}
      </main>
    </>
  )
}

export default PageLayout
