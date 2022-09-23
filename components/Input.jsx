import React, { useState, useRef } from 'react'

import CountrySelector from './CountrySelector'
import Autocomplete from '../components/Autocomplete'

import { useShow } from '../context/ShowContext'
import { useComponentFocus } from '../hooks/useComponentFocus'

const Input = () => {
  const searchBarRef = useRef(null)
  const { focus: searchFocus } = useComponentFocus(searchBarRef)
  const [input, setInput] = useState('')

  const { show, unsetShow } = useShow()

  const handleChangeInput = (e) => {
    setInput(e.target.value)
    if (!show.id) return
    unsetShow()
  }

  const handleEmptyInput = () => {
    setInput('')
  }

  return (
    <div className="z-10 max-w-[600px] w-full flex flex-col gap-4 cursor-default">
      <div
        style={{ gridTemplateColumns: '3rem auto 3rem' }}
        className={`z-10 relative grid h-12 rounded-3xl border-[1px] border-gray-300 hover:shadow-md ${
          searchFocus ? 'shadow-md' : ''
        }
        ${searchFocus && input && !show.id ? 'rounded-b-none' : ''}
        `}
        ref={searchBarRef}
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
          className={`absolute mt-[11px] ml-12 px-2 transition-transform duration-300 pointer-events-none
            ${
              (searchFocus || input) && '-translate-x-4 -translate-y-6 scale-90'
            }
            `}
        >
          <span className="opacity-70">Type a tv show or movie name</span>
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
        />
      </div>
      <div className="relative grid h-12">
        <CountrySelector />
      </div>
    </div>
  )
}

export default Input
