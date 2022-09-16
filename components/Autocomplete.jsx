import React, { useState, useEffect, useRef } from 'react'

import { useAutocompletion } from '../hooks/useAutocompletion'
import { useKeys } from '../hooks/useKeys'

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
      className={`pt-[1px] mx-4 pb-2 bg-white border-gray-300 border-t-0 border-[1px] shadow-md mt-11 rounded-b-3xl overflow-hidden absolute left-0 right-0 ${
        show && !query.id && query.text ? '' : 'hidden'
      }`}
      onMouseLeave={() => setSelectedItem()}
    >
      <div className="border-gray-300 border-t-[1px] w-11/12 m-auto pb-2" />

      {autocompleteItems.map((item, index) => (
        <li
          key={index}
          className={`py-3 px-6 cursor-default h-12 flex items-center ${
            selectedItem === index ? 'bg-black bg-opacity-10' : ''
          }`}
          onMouseEnter={() => setSelectedItem(index)}
          onClick={() =>
            !loading && setQuery({ ...query, id: item.id, text: item.title })
          }
        >
          {loading ? (
            <span className="h-4 w-full opacity-80 rounded animate-pulse bg-gray-300" />
          ) : (
            <p className="whitespace-nowrap text-ellipsis overflow-hidden">
              {item.title}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default Autocomplete
