import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import Autocomplete from '../components/Autocomplete'
import ShowCard from '../components/ShowCard'
import PageLayout from '../components/PageLayout'

import { useComponentFocus } from '../hooks/useComponentFocus'

export default function Home({ countries }) {
  const [query, setQuery] = useState({ type: 'tv', id: undefined, text: '' })
  const [completeQueryTo, setCompleteQueryTo] = useState()
  const [selectedCountry, setSelectedCountry] = useState('AR')
  const [show, setShow] = useState()

  const searchBarRef = useRef(null)
  const { focus: searchFocus } = useComponentFocus(searchBarRef)

  useEffect(() => {
    if (!query.id || !show) return
    setShow((prevState) => {
      return {
        ...prevState,
        country: selectedCountry
      }
    })
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
      <div>
        <form>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-gray-600"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </form>
        <form
          className="flex flex-col gap-4 w-full p-4"
          onSubmit={handleFormSubmit}
          ref={searchBarRef}
        >
          <div
            style={{ gridTemplateColumns: '3rem auto 4rem' }}
            className={`z-50 relative grid h-12 w-full rounded-3xl bg-gray-800 hover:bg-gray-700 ${
              searchFocus ? 'bg-gray-700 border-transparent' : 'border-gray-600'
            } ${query.text && !query.id && searchFocus && 'rounded-b-none'}`}
          >
            <button
              type="submit"
              className="w-14 cursor-pointer h-full bg-transparent text-gray-400 grid place-content-center"
            >
              <span className="-rotate-45 scale-125 mt-[1px]">⚲</span>
            </button>
            <input
              type="text"
              placeholder={`Search for a ${
                query.type === 'movie' ? 'Movie' : 'TV Show'
              }`}
              value={query.text}
              onKeyDown={handleInputCompletion}
              onChange={(e) =>
                setQuery({ ...query, id: undefined, text: e.target.value })
              }
              className="z-10 h-full w-full focus-visible:outline-none bg-transparent"
            />
            <button
              type="reset"
              onClick={() => setQuery({ ...query, id: undefined, text: '' })}
              className="cursor-pointer h-full bg-transparent text-gray-400 grid place-content-center "
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
          class="grid grid-cols-2 items-center w-[200px] relative bg-gray-600 m-auto rounded-3xl py-3 cursor-pointer overflow-hidden select-none"
          onClick={() =>
            setQuery((prev) =>
              prev.type === 'tv'
                ? { ...query, type: 'movie', id: undefined }
                : { ...query, type: 'tv', id: undefined }
            )
          }
        >
          <p className="text-center z-10">Movies</p>
          <p className="text-center z-10">TV</p>
          <span
            class={`absolute bg-gray-800 w-1/2 h-full rounded-3xl transition-all duration-300 ease-in-out ${
              query.type === 'movie' ? '' : 'translate-x-[100px]'
            }`}
          ></span>
        </div>
        {show && <ShowCard show={show} />}
      </div>
    </PageLayout>
  )
}

export async function getStaticProps() {
  const { data } = await axios({
    method: 'get',
    url: `https://api.themoviedb.org/3/configuration/countries`,
    params: {
      api_key: process.env.API_KEY
    }
  })
  const countries = data
    .filter(
      (item) =>
        item.iso_3166_1 === 'AR' ||
        item.iso_3166_1 === 'UY' ||
        item.iso_3166_1 === 'CL' ||
        item.iso_3166_1 === 'US' ||
        item.iso_3166_1 === 'ES' ||
        item.iso_3166_1 === 'BR'
    )
    .reduce((array, curr) => {
      array.push(curr.iso_3166_1)
      return array
    }, [])
  return {
    props: { countries }
  }
}
