import React from 'react'
import Head from 'next/head'
import useTitle from '../hooks/useTitle'
import { useTheme } from '../context/ThemeContext'

const PageLayout = ({ children }) => {
  const { title } = useTitle()
  const { theme } = useTheme()
  return (
    <>
      <style>
        {
          `body {
            background-color: ${theme === 'light' ? 'rgb(248 250 252)' : 'rgb(25 39 52)'};
            color: ${theme === 'light' ? 'rgb(25 39 52)' : 'rgb(248 250 252)'}
        }`
}
      </style>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main
        className='min-h-screen pb-10'
      >
        {children}
      </main>
    </>
  )
}

export default PageLayout
