import React, { useState, useEffect } from 'react'
import axios from 'axios'

const URL = 'https://api.themoviedb.org/3/search/'
const LENGTH = 5

export const useAutocompletion = (input) => {
  const [autocompleteItems, setAutocompleteItems] = useState(new Array(LENGTH))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (!input) return setAutocompleteItems([])
    const fetchAutocomplete = async () => {
      const { data: dataTv } = await axios({
        method: 'get',
        url: URL + 'tv',
        params: {
          api_key: process.env.API_KEY,
          query: input
        }
      })
      const { data: dataMovies } = await axios({
        method: 'get',
        url: URL + 'movie',
        params: {
          api_key: process.env.API_KEY,
          query: input
        }
      })

      const resultsTv = dataTv.results.slice(0, 5).reduce((array, item) => {
        array.push({
          id: item.id,
          title: item.name,
          year: !item.first_air_date
            ? 'not aired yet'
            : item.first_air_date.slice(0, item.first_air_date.indexOf('-')),
          type: 'tv',
          popularity: item.popularity
        })
        return array
      }, [])

      const resultsMovie = dataMovies.results
        .slice(0, 5)
        .reduce((array, item) => {
          array.push({
            id: item.id,
            title: item.title,
            year: !item.release_date
              ? 'not aired yet'
              : item.release_date.slice(0, item.release_date.indexOf('-')),
            type: 'movie',
            popularity: item.popularity
          })
          return array
        }, [])

      const results = resultsTv
        .concat(resultsMovie)
        .sort((a, b) => b.popularity - a.popularity)

      return results
    }
    const timeOutId = setTimeout(() => {
      fetchAutocomplete(input).then((res) => {
        setAutocompleteItems(res)
        setLoading(false)
      })
    }, 1000)
    return () => clearTimeout(timeOutId)
  }, [input])

  return {
    autocompleteItems,
    loading,
    length: autocompleteItems.length
  }
}
