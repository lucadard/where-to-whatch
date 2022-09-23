import React from 'react'
import Head from 'next/head'

const PageLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="h-screen">{children}</main>
    </>
  )
}

export default PageLayout
