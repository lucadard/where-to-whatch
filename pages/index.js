import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import ShowCard from '../components/ShowCard'
import PageLayout from '../components/PageLayout'
import CountrySelect from '../components/CountrySelect'

import Input from '../components/Input'

export default function Home() {
  const [type, setType] = useState('tv')
  const [show, setShow] = useState({ type: 'tv' })
  const [isShowHidden, setIsShowHidden] = useState(true)

  const handleChangeType = () => {
    setType((prevType) => {
      const newType = prevType === 'tv' ? 'movie' : 'tv'
      setShow((prevShow) => ({ ...prevShow, id: undefined, type: newType }))
      return newType
    })
  }

  return (
    <PageLayout
      title={!show.title ? 'Where to watch?' : `Where to watch ${show.title}?`}
    >
      <div className="flex flex-col items-center gap-6 mx-4">
        <CountrySelect />
        <Input
          show={{ get: show, set: setShow }}
          unhideShow={() => setIsShowHidden(false)}
        />
        <div
          className="grid grid-cols-2 items-center w-[200px] relative border-[1px] rounded bg-black bg-opacity-[2%] py-3 cursor-pointer overflow-hidden select-none"
          onClick={handleChangeType}
        >
          <p className="text-center">Movies</p>
          <p className="text-center">TV</p>
          <span
            className={`absolute bg-gray-500 w-1/3 h-[2px] right-1/2 left-0 mx-auto mt-7 rounded-3xl transition-all duration-300 ease-in-out ${
              type === 'movie' ? '' : 'translate-x-[100px]'
            }`}
          ></span>
        </div>
        {!isShowHidden && <ShowCard show={show} />}
      </div>
    </PageLayout>
  )
}
