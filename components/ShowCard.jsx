import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

import { useShow } from '../context/ShowContext'
import { useTheme } from '../context/ThemeContext'

const ShowCard = () => {
  const [showInfo, setShowInfo] = useState({ data: undefined, loading: true })
  const [providers, setProviders] = useState({ data: [], loading: true })
  const [animation, setAnimation] = useState('close')

  const { show } = useShow()
  const { theme } = useTheme()

  const fetchShowInfo = async () => {
    const { data } = await axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/${show.type}/${show.id}`,
      params: {
        api_key: process.env.API_KEY
      }
    })
    return data
  }
  const fetchStreamingInfo = async () => {
    const { data } = await axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/${show.type}/${show.id}/watch/providers`,
      params: {
        api_key: process.env.API_KEY
      }
    })
    const countryProviders = data.results[show.country]
    return countryProviders ? countryProviders.flatrate : []
  }

  useEffect(() => {
    if (!show.id) return
    setAnimation('close')
    setTimeout(() => {
      setShowInfo((prev) => ({ ...prev, loading: true }))
      setProviders((prev) => ({ ...prev, loading: true }))
      fetchShowInfo().then((res) => setShowInfo({ data: res, loading: false }))
      fetchStreamingInfo().then((res) => {
        setProviders({ data: res, loading: false })
        setAnimation('open')
      })
    }, 800)
  }, [show])

  return (
    <div
      className={`relative w-screen max-w-[600px] h-auto sm:h-[450px] p-4 sm:p-0 flex sm:grid grid-cols-2 sm:rounded-xl overflow-hidden sm:shadow-lg 
      ${theme === 'light' ? 'bg-blue-100' : 'bg-orange-900'}
    ${
      animation === 'open' ? '' : 'scale-y-0'
    } transition-transform duration-700`}
    >
      <div className='relative w-1/2 sm:w-full h-full self-center'>
        {!showInfo.loading && (
          <Image
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${showInfo.data.poster_path}`}
            alt={showInfo.data.name + ' poster'}
            width='300'
            height='450'
            // layout="fill"
            objectFit='contain'
            className='rounded-xl sm:rounded-none'
          />
        )}
      </div>
      <div className='p-4'>
        <h3 className='mb-2'>Watch now on:</h3>
        {!providers.loading && (
          <div className='flex gap-2 flex-wrap items-center'>
            {providers.data && providers.data.length
              ? (
                  providers.data.map((provider) => (
                    <Image
                      src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name + ' logo'}
                      width='50'
                      height='50'
                      key={provider.provider_id}
                      className='rounded-sm'
                    />
                  ))
                )
              : (
                <span>No data available.</span>
                )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowCard
