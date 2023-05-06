import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

import { useShow } from '../context/ShowContext'

const ShowCard = ({ setLoading }) => {
  const [showInfo, setShowInfo] = useState({ data: undefined, loading: true })
  const [providers, setProviders] = useState({ data: [], loading: true })
  const [animation, setAnimation] = useState('close')

  const { show } = useShow()

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
    setLoading(true)
    setAnimation('close')
    setTimeout(() => {
      setShowInfo((prev) => ({ ...prev, loading: true }))
      setProviders((prev) => ({ ...prev, loading: true }))
      fetchShowInfo().then((res) => setShowInfo({ data: res, loading: false }))
      fetchStreamingInfo().then((res) => {
        setProviders({ data: res, loading: false })
        setAnimation('open')
        setLoading(false)
      }).catch(console.error)
    }, 800)
  }, [show])

  return (
    <div className={`flex gap-5 sm:gap-10 bg-black/10 sm:p-5 p-2 sm:rounded-3xl
    ${
      animation === 'open' ? '' : 'scale-y-0'
    } transition-transform duration-700
    `}
    >
      <div className='relative w-full aspect-[8/12] flex-[3] rounded-xl overflow-hidden'>
        {showInfo.data &&
          <Image
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${showInfo.data.poster_path}`}
            alt={showInfo.data.name + ' poster'}
            objectFit='cover'
            objectPosition='bottom'
            layout='fill'
          />}
      </div>
      <div className='flex-[3]'>
        <h3 className='mb-2 font-semibold sm:text-2xl'>Watch now on:</h3>
        {!providers.loading && (
          <div className='flex gap-2 flex-wrap items-center pb-5'>
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
