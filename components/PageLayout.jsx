import Head from 'next/head'
import React from 'react'

const PageLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="h-screen bg-gray-900 text-white">
        <main>{children}</main>
      </div>
    </>
  )
}

export default PageLayout
