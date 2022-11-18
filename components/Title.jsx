/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'

function Title() {
  return (
    <div className="w-full max-w-[600px] px-3">
      <h1 className="text-4xl font-bold">
        <a href="/">Where to watch?</a>
      </h1>
      <span className="italic font-thin">
        Find where your favourite show is being streamed.
      </span>
    </div>
  )
}

export default Title
