import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import Autocomplete from '../components/Autocomplete'
import ShowCard from '../components/ShowCard'
import PageLayout from '../components/PageLayout'
import CountrySelect from '../components/CountrySelect'

import { useComponentFocus } from '../hooks/useComponentFocus'
import { useCountry, CountryProvider } from '../context/CountryContext'

export default function Home() {
  const [query, setQuery] = useState({ type: 'tv', id: undefined, text: '' })
  const [completeQueryTo, setCompleteQueryTo] = useState()
  const [show, setShow] = useState()

  const { selectedCountry } = useCountry()

  const searchBarRef = useRef(null)
  const { focus: searchFocus } = useComponentFocus(searchBarRef)

  useEffect(() => {
    if (!query.id || !show) return
    console.log(selectedCountry)
    setShow((prevState) => ({
      ...prevState,
      country: selectedCountry
    }))
  }, [selectedCountry])

  const handleFormSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    if (!query.id) return
    setShow({
      type: query.type,
      id: query.id,
      title: query.text,
      country: selectedCountry
    })
  }
  const handleInputCompletion = (e) => {
    if (e.keyCode === 38 || e.keyCode === 40) return e.preventDefault()
    if (query.id || !completeQueryTo) return
    if (e.key !== 'Tab' && e.key !== 'Enter') return
    let { id, title } = completeQueryTo
    setQuery({ ...query, id, text: title })
    e.preventDefault()
  }

  return (
    <PageLayout
      title={!show ? 'Where to watch?' : `Where to watch ${show.title}?`}
    >
      <div className="flex flex-col items-center gap-6">
        <CountrySelect />
        <form
          className="z-10 relative"
          onSubmit={handleFormSubmit}
          ref={searchBarRef}
        >
          <div
            style={{ gridTemplateColumns: '3rem auto 4rem' }}
            className={`grid h-12 w-full rounded-3xl border-[1px] border-gray-300 hover:shadow-md ${
              searchFocus ? 'shadow-md' : ''
            } ${query.text && !query.id && searchFocus && 'rounded-b-none'}`}
          >
            <button
              type="submit"
              className={`w-14 cursor-pointer h-full bg-transparent grid place-content-center ${
                query.id ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <span className="-rotate-45 scale-125 mt-[1px]">⚲</span>
            </button>
            <input
              type="text"
              value={query.text}
              onKeyDown={handleInputCompletion}
              onChange={(e) =>
                setQuery({ ...query, id: undefined, text: e.target.value })
              }
              className="h-full w-full focus-visible:outline-none bg-transparent"
            />
            <span
              className={`absolute mt-3 ml-12 px-2 transition-transform duration-300 select-none ${
                searchFocus || query.text
                  ? '-translate-x-4 -translate-y-6 scale-90'
                  : ''
              }`}
            >
              {`Search for a ${query.type === 'movie' ? 'Movie' : 'TV Show'}`}
              <span
                className={`-z-10 absolute left-0 right-0 mx-auto bg-white text-transparent ${
                  searchFocus || query.text
                    ? 'w-full transition-all duration-300 delay-100'
                    : 'w-0'
                }`}
              >
                .
              </span>
            </span>
            <button
              type="reset"
              onClick={() => setQuery({ ...query, id: undefined, text: '' })}
              className={`cfursor-pointer h-full bg-transparent text-gray-400 grid place-content-center ${
                query.text !== '' ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <span className="scale-150 -mt-[5px]">×</span>
            </button>
            <Autocomplete
              query={query}
              setQuery={setQuery}
              setCompletion={setCompleteQueryTo}
              show={searchFocus}
            />
          </div>
        </form>
        <div
          className="grid grid-cols-2 items-center w-[200px] relative border-[1px] rounded bg-black bg-opacity-[2%] py-3 cursor-pointer overflow-hidden select-none"
          onClick={() =>
            setQuery((prev) =>
              prev.type === 'tv'
                ? { ...query, type: 'movie', id: undefined }
                : { ...query, type: 'tv', id: undefined }
            )
          }
        >
          <p className="text-center">Movies</p>
          <p className="text-center">TV</p>
          <span
            className={`absolute bg-gray-500 w-1/3 h-[2px] right-1/2 left-0 mx-auto mt-7 rounded-3xl transition-all duration-300 ease-in-out ${
              query.type === 'movie' ? '' : 'translate-x-[100px]'
            }`}
          ></span>
        </div>
        {show && <ShowCard show={show} />}
      </div>
    </PageLayout>
  )
}
