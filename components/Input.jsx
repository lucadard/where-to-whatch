import React, { useState, useRef } from 'react'

import Autocomplete from '../components/Autocomplete'
import { useComponentFocus } from '../hooks/useComponentFocus'

const Input = ({ show, unhideShow }) => {
  const searchBarRef = useRef(null)
  const { focus: searchFocus } = useComponentFocus(searchBarRef)
  const [input, setInput] = useState('')

  const handleChangeInput = (e) => {
    setInput(e.target.value)
    if (!show.get.id) return
    show.set((prev) => ({ ...prev, id: undefined }))
  }

  const handleEmptyInput = () => {
    setInput('')
  }

  return (
    <div
      ref={searchBarRef}
      style={{ gridTemplateColumns: '3rem auto 4rem' }}
      className={`z-10 relative max-w-[600px] grid h-12 w-full rounded-3xl border-[1px] border-gray-300 hover:shadow-md cursor-default
          ${searchFocus ? 'shadow-md' : ''}
          ${searchFocus && input && !show.get.id ? 'rounded-b-none' : ''}
          `}
    >
      <button className="w-14 h-full bg-transparent grid place-content-center cursor-default">
        <span className="-rotate-45 scale-125 mt-[1px]">⚲</span>
      </button>
      <input
        type="text"
        value={input}
        onChange={handleChangeInput}
        className="h-full w-full focus-visible:outline-none bg-transparent"
      />
      <span
        className={`absolute mt-3 ml-12 px-2 transition-transform duration-300 
            ${
              searchFocus || input
                ? '-translate-x-4 -translate-y-6 scale-90'
                : 'pointer-events-none'
            }
            `}
      >
        Search
        <span
          className={`-z-10 absolute left-0 right-0 mx-auto bg-white text-transparent ${
            searchFocus || input
              ? 'w-full transition-all duration-300 delay-100'
              : 'w-0'
          }`}
        >
          .
        </span>
      </span>
      <button
        onClick={handleEmptyInput}
        className="h-full bg-transparent text-gray-400 grid place-content-center select-none cursor-default"
      >
        <span
          className={`scale-150 -mt-[5px] ${input ? 'cursor-pointer' : ''}`}
        >
          ×
        </span>
      </button>
      <Autocomplete
        input={{ get: input, set: setInput }}
        focus={searchFocus}
        show={show}
        unhideShow={unhideShow}
      />
    </div>
  )
}

export default Input
