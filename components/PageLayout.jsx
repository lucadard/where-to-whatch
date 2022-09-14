import Head from 'next/head'
import React from 'react'

const PageLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>{children}</main>
      <style jsx>{`
        main {
          margin: 0 15%;
        }
      `}</style>
    </>
  )
}

export default PageLayout
