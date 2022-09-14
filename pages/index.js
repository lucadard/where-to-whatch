import React from 'react'
import Head from 'next/head'
import { useState } from 'react'
import Autocomplete from '../components/Autocomplete'
import ShowCard from '../components/ShowCard'
import PageLayout from '../components/PageLayout'

export default function Home() {
  const [query, setQuery] = useState({ type: 'tv', id: undefined, text: '' })
  const [completeQueryTo, setCompleteQueryTo] = useState()

  const [show, setShow] = useState()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!query.id) return
    setShow({ type: query.type, id: query.id, title: query.text })
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
        <form onSubmit={handleFormSubmit}>
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
              placeholder="Search for a movie"
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
        form {
          display: grid;
          grid-template-columns: 7rem auto 4rem;
          gap: 0 1rem;
          padding: 1rem;
        }
        .input-group {
          position: relative;
        }
        span: {
          color: white;
        }
      `}</style>
    </PageLayout>
  )
}
