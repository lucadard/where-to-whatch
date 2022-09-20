import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useCountry } from '../context/CountryContext'

const ShowCard = ({ show }) => {
  const [showInfo, setShowInfo] = useState({ data: undefined, loading: true })
  const [providers, setProviders] = useState({ data: [], loading: true })
  const { selectedCountry } = useCountry()
  const [animation, setAnimation] = useState('close')

  const fetchShowInfo = async () => {
    const { data } = await axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/${show.type}/${show.id}`,
      params: {
        api_key: process.env.API_KEY
      }
    })
    console.log(show, data)
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

    const countryProviders = data.results[selectedCountry]
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
  }, [show.id])

  return (
    <div
      className={`relative w-[600px] h-[450px] mx-auto grid grid-cols-2 rounded-xl overflow-hidden shadow-lg bg-blue-100 
    ${
      animation === 'open' ? '' : 'h-0 translate-y-[225px]'
    } duration-500 transition-all ease-in-out`}
    >
      <div className="relative h-full w-full">
        {!showInfo.loading && (
          <Image
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${showInfo.data.poster_path}`}
            alt={showInfo.data.name + ' poster'}
            width="300"
            height="450"
          />
        )}
      </div>
      <div className="h-full p-4">
        <h3 className="mb-2">Watch now on:</h3>
        {!providers.loading && (
          <div className="flex gap-2 flex-wrap items-center">
            {providers.data && providers.data.length ? (
              providers.data.map((provider) => (
                <Image
                  src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name + ' logo'}
                  width="64"
                  height="64"
                  key={provider.provider_id}
                  className="rounded-md"
                />
              ))
            ) : (
              <span>No data available.</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowCard
