import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { useCountry } from '../context/CountryContext'
import { useComponentFocus } from '../hooks/useComponentFocus'
import { useShow } from '../context/ShowContext'

const CountrySelector = () => {
  const containerRef = useRef(undefined)
  const { focus: selectorFocus } = useComponentFocus(containerRef)
  const { countries, country, setCountry } = useCountry()
  const { unsetShow } = useShow()

  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    if (showOptions && !selectorFocus) setShowOptions(false)
  }, [selectorFocus])

  const handleToggleShowOptions = (newCountry) => {
    setShowOptions(!showOptions)
    if (!newCountry) return
    if (newCountry.code === country.code) return
    setCountry(newCountry)
    unsetShow()
  }

  return (
    <div
      ref={containerRef}
      key={country.code}
      className={`flex w-full h-full cursor-pointer items-center justify-between rounded-3xl border-[1px] border-gray-300 hover:shadow-md
      ${showOptions ? 'border-b-0 rounded-b-none' : ''}`}
      onClick={() => handleToggleShowOptions()}
    >
      <span className="capitalize font-sans pl-6">{country.name}</span>
      <div
        className={`text-xl -mb-2 scale-150 select-none opacity-50 
      ${showOptions ? '-mt-[13px] pr-4' : '-rotate-180 pl-4'}`}
      >
        ▴
      </div>
      <div
        className={`z-10 absolute pb-2 top-11 left-0 right-0 bg-white border-[1px] border-gray-300 border-t-0 shadow-lg rounded-xl rounded-t-none overflow-hidden 
      ${!showOptions ? 'hidden' : ''}`}
      >
        <div className="h-[1px] w-11/12 mt-1 mb-2 bg-gray-300 mx-auto" />
        {showOptions &&
          countries.map(({ name, code }) => (
            <div
              key={code}
              className={`py-2 pl-6 
            ${code === country.code ? 'bg-orange-400' : 'hover:bg-orange-200'}`}
              onClick={() => handleToggleShowOptions({ name, code })}
            >
              <span className="capitalize font-sans">{name}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CountrySelector
