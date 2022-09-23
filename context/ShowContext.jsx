import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const ShowContext = createContext(undefined)

const ShowProvider = ({ children }) => {
  const router = useRouter()
  const [show, setShow] = useState({})

  useEffect(() => {
    const { lang, type, id } = router.query
    if (lang && type && id)
      setShow({
        id,
        type,
        country: lang
      })
  }, [router.query])

  const pushUrl = (show) => {
    router.push(
      {
        query: { lang: show.country, type: show.type, id: show.id }
      },
      undefined,
      { shallow: true }
    )
  }

  const value = {
    show,
    setShow: (show) => {
      setShow(show), pushUrl(show)
    },
    unsetShow: () => {
      setShow({})
    },
    isShowSet: show.id
  }
  return <ShowContext.Provider value={value}>{children}</ShowContext.Provider>
}

const useShow = () => {
  const context = useContext(ShowContext)
  if (context === undefined)
    throw new Error('useShow must be used within a ShowProvider')
  return context
}

export { ShowProvider, useShow }
