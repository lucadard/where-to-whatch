import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

const ShowCard = ({ show }) => {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
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
    fetchData().then((res) => {
      setProviders(res)
      setLoading(false)
    })
  }, [show])

  return (
    <div className="">
      {loading ? (
        <span>loading...</span>
      ) : (
        <>
          <h3>Where to stream:</h3>
          <div className="providers">
            {providers && providers.length ? (
              providers.map((provider) => (
                <div key={provider.provider_id}>
                  <div className="relative w-16 h-16 m-2">
                    <Image
                      src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name + ' logo'}
                      layout="fill"
                    />
                  </div>
                </div>
              ))
            ) : (
              <span>No data available.</span>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ShowCard
