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
          api_key: 'a53c3f008cb3e74bef3bad7b2809a34f'
        }
      })

      const { AR } = data.results
      return AR ? data.results.AR.flatrate : []
    }
    fetchData().then((res) => {
      setProviders(res)
      setLoading(false)
    })
  }, [show])

  return (
    <div className="container">
      {loading ? (
        <span>loading...</span>
      ) : (
        <>
          <h3>Where to stream:</h3>
          <div className="providers">
            {providers && providers.length ? (
              providers.map((provider) => (
                <div key={provider.provider_id}>
                  {/* <p>{service.provider_name}</p> */}
                  <div className="image-container">
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

      <style jsx>{`
        .container {
          margin: 0 3rem;
        }
        .providers {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .image-container {
          width: 70px;
          height: 70px;
          border-radius: 0.3rem;
          overflow: hidden;
          position: relative;
        }
      `}</style>
    </div>
  )
}

export default ShowCard
