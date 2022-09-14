import React, { useState, useEffect } from 'react'

import { useAutocompletion } from '../hooks/useAutocompletion'

const Autocomplete = ({ query, setQuery, setCompletion }) => {
  const { autocompleteItems, nextCompletion } = useAutocompletion(query)
  const [selectedItem, setSelectedItem] = useState(0)

  document.onkeydown = (e) => {
    if (e.key === 'ArrowUp')
      return setSelectedItem((prevItem) =>
        prevItem === 0 ? autocompleteItems.length - 1 : prevItem - 1
      )
    if (e.key === 'ArrowDown')
      return setSelectedItem((prevItem) =>
        prevItem === autocompleteItems.length - 1 ? 0 : prevItem + 1
      )
  }

  useEffect(() => {
    setCompletion(autocompleteItems[selectedItem])
  }, [setCompletion, autocompleteItems, selectedItem])

  return (
    <ul className="autocomplete">
      {autocompleteItems.map((item, index) => (
        <li
          key={item.id}
          className={selectedItem === index ? 'selected' : ''}
          onMouseEnter={() => setSelectedItem(index)}
        >
          <p
            onClick={() =>
              setQuery({ ...query, id: item.id, text: item.title })
            }
          >
            {item.title}
          </p>
        </li>
      ))}
    </ul>
  )
}

export default Autocomplete
