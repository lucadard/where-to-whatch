import React, { useState, useEffect } from 'react'
import axios from 'axios'

const URL = 'https://api.themoviedb.org/3/search/'
const API_KEY = 'a53c3f008cb3e74bef3bad7b2809a34f'

export const useAutocompletion = (query) => {
  const [autocompleteItems, setAutocompleteItems] = useState([])

  useEffect(() => {
    if (query.text === '' || query.id) return setAutocompleteItems([])
    const fetchAutocomplete = async () => {
      const { data } = await axios({
        method: 'get',
        url: URL + query.type,
        params: {
          api_key: API_KEY,
          query: query.text
        }
      })
      return data.results.slice(0, 5).reduce((array, item) => {
        array.push({
          id: item.id,
          title: query.type === 'tv' ? item.original_name : item.original_title
        })
        return array
      }, [])
    }
    const timeOutId = setTimeout(() => {
      fetchAutocomplete(query.text).then((res) => {
        setAutocompleteItems(res)
      })
    }, 1000)
    return () => clearTimeout(timeOutId)
  }, [query])

  return {
    autocompleteItems,
    nextCompletion: autocompleteItems[0] || undefined
  }
}
