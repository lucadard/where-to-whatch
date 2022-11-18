import React, { useState } from 'react'

import { useAutocompletion } from '../hooks/useAutocompletion'
import { useShow } from '../context/ShowContext'
import { useKeys } from '../hooks/useKeys'
import { useCountry } from '../context/CountryContext'
import Image from 'next/image'
import { useTheme } from '../context/ThemeContext'

const Autocomplete = ({ input, focus }) => {
  const { autocompleteItems, loading } = useAutocompletion(input.get)
  const [selectedItem, setSelectedItem] = useState(undefined)
  const { country } = useCountry()
  const { theme } = useTheme()
  const { setShow, isShowSet } = useShow()

  const handleSelectShow = (newShow) => {
    setShow({
      id: newShow.id,
      type: newShow.type,
      country: country.code
    })
    input.set(newShow.title)
  }

  return (
    <ul
      className={`pt-[2px] min-h-[30px] pb-2 shadow-md mt-11 rounded-b-3xl absolute w-full ring-[1px]  
      ${theme === 'light' ? 'bg-light ring-dark' : 'bg-dark ring-light'} 
      ${!focus || !input.get || isShowSet ? 'hidden' : ''}`}
    >
      <div className=" w-full h-2 -mt-1">
        <div
          className={`h-[1px] w-11/12 mx-auto 
          ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}
        />
      </div>
      {autocompleteItems.length ? (
        autocompleteItems.map((item, index) => (
          <li
            key={index}
            className={`py-3 px-6 cursor-default h-12 flex items-center hover:bg-opacity-10 
            ${theme === 'light' ? 'hover:bg-dark' : 'hover:bg-light'}`}
            onClick={() => !loading && handleSelectShow(item)}
          >
            {loading ? (
              <span
                className={`h-4 w-full opacity-80 rounded animate-pulse 
                ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}
              />
            ) : (
              <div className="w-full">
                <p className="whitespace-nowrap text-ellipsis overflow-hidden">
                  {item.title}
                </p>
                <p className="font-sans italic text-sm text-opacity-80 self-end">
                  {item.type === 'tv' ? 'tv show' : 'movie'} ({item.year})
                </p>
              </div>
            )}
          </li>
        ))
      ) : loading ? (
        <div className="flex justify-center items-center">
          <Image
            src="/assets/spinner.svg"
            alt="loading spinner for autocompletion"
            width={20}
            height={20}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <span className="opacity-80">
            {`We didn't find any shows with that name.`}
          </span>
        </div>
      )}
    </ul>
  )
}

export default Autocomplete
