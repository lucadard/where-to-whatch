import React, { useState } from 'react'

import { useAutocompletion } from '../hooks/useAutocompletion'
import { useKeys } from '../hooks/useKeys'

const Autocomplete = ({ input, show, focus, unhideShow }) => {
  const { autocompleteItems, loading } = useAutocompletion(
    input.get,
    show.get.type
  )
  const [selectedItem, setSelectedItem] = useState(undefined)

  const handleSelectShow = (newShow) => {
    show.set((prev) => ({ ...prev, id: newShow.id, title: newShow.title }))
    input.set(newShow.title)
    unhideShow()
  }

  return (
    <ul
      className={`pt-[2px] min-h-[30px] pb-2 bg-white shadow-md mt-11 rounded-b-3xl absolute w-full ring-[1px] ring-gray-300 
      ${!focus || !input.get || show.get.id ? 'hidden' : ''}`}
    >
      <div className="bg-white w-full h-2 -mt-1">
        <div className="h-[1px] w-11/12 bg-gray-300 mx-auto" />
      </div>

      {autocompleteItems.map((item, index) => (
        <li
          key={index}
          className={`py-3 px-6 cursor-default h-12 flex items-center hover:bg-black hover:bg-opacity-10`}
          onClick={() => !loading && handleSelectShow(item)}
        >
          {loading ? (
            <span className="h-4 w-full opacity-80 rounded animate-pulse bg-gray-300" />
          ) : (
            <p className="whitespace-nowrap text-ellipsis overflow-hidden">
              {item.title} <span>({item.year})</span>
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default Autocomplete
