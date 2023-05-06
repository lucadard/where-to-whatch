import React from 'react'
import Head from 'next/head'
import useTitle from '../hooks/useTitle'
import { useTheme } from '../context/ThemeContext'
import Link from 'next/link'

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
      <main className='min-h-screen flex flex-col mx-auto justify-between pt-14'>
        {children}
      </main>
      <footer className='bg-black/10 border-t border-black/10 py-3'>
        <p className='text-center'>
          Made by{' '}
          <a
            className='text-blue-700'
            href='https://github.com/lucadard'
            target='_blank'
            rel='noreferrer'
          >lucadard
          </a>
        </p>
      </footer>
    </>
  )
}

export default PageLayout
