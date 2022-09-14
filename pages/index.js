import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Autocomplete from '../components/Autocomplete'
import ShowCard from '../components/ShowCard'
import PageLayout from '../components/PageLayout'

export default function Home({ countries }) {
  const [query, setQuery] = useState({ type: 'tv', id: undefined, text: '' })
  const [completeQueryTo, setCompleteQueryTo] = useState()
  const [selectedCountry, setSelectedCountry] = useState('AR')

  const [show, setShow] = useState()

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
      <form className="country">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </form>
      <div>
        <form className="query" onSubmit={handleFormSubmit}>
          <select
            name="select"
            value={query.type}
            onChange={(e) => {
              setQuery({ ...query, type: e.target.value, id: undefined })
            }}
          >
            <option value="tv">TV</option>
            <option value="movie">Movies</option>
          </select>
          <div className="input-group">
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
            />
            {query.text && (
              <Autocomplete
                query={query}
                setQuery={setQuery}
                setCompletion={setCompleteQueryTo}
              />
            )}
          </div>
          <button>{query.id ? 'GO' : 'X'}</button>
        </form>
        {show && <ShowCard show={show} />}
      </div>
      <style jsx>{`
        form.query {
          display: grid;
          grid-template-columns: 7rem auto 4rem;
          gap: 0 1rem;
          gap: 1rem;
        }
        form.country {
          width: 8rem;
        }
        form {
          margin-bottom: 0;
          padding: 1rem;
          padding-bottom: 0;
        }
        form > * {
          margin-bottom: 0;
        }
        input,
        select {
          margin-bottom: 0;
        }
        .input-group {
          position: relative;
        }
        span: {
          color: white;
        }
        @media (max-width: 600px) {
          form.query {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
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
  const countries = data.reduce((array, curr) => {
    array.push(curr.iso_3166_1)
    return array
  }, [])
  return {
    props: { countries }
  }
}
