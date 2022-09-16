import React, { useState, useEffect, useRef } from 'react'

import { useAutocompletion } from '../hooks/useAutocompletion'
import { useKeys } from '../hooks/useKeys'
import { AutocompleteTitleSkeleton } from '../assets/Skeleton'

const Autocomplete = ({ query, setQuery, setCompletion, show }) => {
  const { autocompleteItems, loading } = useAutocompletion(query)
  const [selectedItem, setSelectedItem] = useState(undefined)
  const { keys } = useKeys()

  useEffect(() => {
    let autocompleteLenght = autocompleteItems.length - 1
    if (keys.up)
      setSelectedItem((prevItem) => {
        if (prevItem === undefined) return autocompleteLenght
        return prevItem === 0 ? autocompleteLenght : prevItem - 1
      })
    else if (keys.down)
      setSelectedItem((prevItem) => {
        if (prevItem === undefined) return 0
        return prevItem === autocompleteLenght ? 0 : prevItem + 1
      })
  }, [keys, autocompleteItems])

  useEffect(() => {
    setCompletion(autocompleteItems[selectedItem])
  }, [setCompletion, autocompleteItems, selectedItem])

  return (
    <ul
      className={`bg-gray-700 mt-11 rounded-b-3xl overflow-hidden absolute w-full h-[253px] py-1 ${
        show && !query.id && query.text ? '' : 'hidden'
      }`}
      onMouseLeave={() => setSelectedItem()}
    >
      <div className="border-gray-500 border-t-[1px] w-11/12 m-auto pb-2"></div>
      {loading
        ? [0, 1, 2, 3, 4].map((_, index) => (
            <li className="h-12 flex px-6 items-center" key={index}>
              <div className="h-4 w-full bg-white opacity-80 rounded animate-pulse -mt-1" />
            </li>
          ))
        : autocompleteItems.map((item, index) => (
            <li
              key={item.id}
              className={`p-3 px-6 cursor-default overflow-hidden ${
                selectedItem === index ? 'bg-gray-600' : ''
              }`}
              onMouseEnter={() => setSelectedItem(index)}
            >
              <p
                onClick={() =>
                  setQuery({ ...query, id: item.id, text: item.title })
                }
                className="font-semibold whitespace-nowrap text-ellipsis"
              >
                {item.title}
              </p>
            </li>
          ))}
    </ul>
  )
}

export default Autocomplete
