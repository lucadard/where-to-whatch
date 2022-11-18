import React, { useEffect, useRef, useState } from 'react'

import { useCountry } from '../context/CountryContext'
import { useComponentFocus } from '../hooks/useComponentFocus'
import { useShow } from '../context/ShowContext'
import { useTheme } from '../context/ThemeContext'

const CountrySelector = () => {
  const containerRef = useRef(undefined)
  const { focus: selectorFocus } = useComponentFocus(containerRef)
  const { countries, country, setCountry } = useCountry()
  const { unsetShow } = useShow()
  const { theme } = useTheme()

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
      className={`flex w-full h-full cursor-pointer justify-between rounded-3xl border-[1px] hover:shadow-md select-none
      ${theme === 'light' ? 'border-dark' : 'border-light'}
      ${showOptions ? 'border-b-0 rounded-b-none' : ''}`}
      onClick={() => handleToggleShowOptions()}
    >
      <span className="capitalize font-sans pl-6 mt-[10px]">
        {country.name}
      </span>
      <div
        className={`text-xl select-none scale-150 ${
          showOptions ? 'pr-4 mt-[9px]' : 'rotate-180 pl-4 mb-[8px]'
        }`}
      >
        <span className="">▴</span>
      </div>
      <div
        className={`z-10 absolute pb-2 top-11 left-0 right-0 bg-${theme} border-[1px] border-t-0 shadow-lg rounded-xl rounded-t-none overflow-hidden 
        ${theme === 'light' ? 'border-dark' : 'border-light'}      
        ${!showOptions ? 'hidden' : ''}`}
      >
        <div
          className={`h-[1px] w-full mt-1 mb-2 ${
            theme === 'light' ? 'bg-dark' : 'bg-light'
          }`}
        />
        {showOptions &&
          countries.map(({ name, code }) => (
            <div
              key={code}
              className={`py-2 pl-6 
            ${
              code === country.code
                ? 'bg-gray-400 text-dark'
                : 'hover:bg-gray-200 hover:text-dark'
            }`}
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
