import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useRouter } from 'next/router'

const useTitle = () => {
  const router = useRouter()
  const [title, setTitle] = useState(undefined)

  useEffect(() => {
    if (router.query.id === undefined) return
    fetchShowTitle(router.query).then((title) => {
      setTitle(title)
    })
  }, [router.query])

  const URL = 'https://api.themoviedb.org/3'
  const fetchShowTitle = async ({ id, type }) => {
    const { data } = await axios({
      method: 'get',
      url: `${URL}/${type}/${id}`,
      params: {
        api_key: process.env.API_KEY
      }
    })
    return type === 'movie' ? data.title : data.name
  }
  return { title: `Where to watch${title ? ' ' + title : ''}?` }
}

export default useTitle
