import React, { useState, useEffect, useCallback } from 'react'

import { useAutocompletion } from '../useAutocompletion'

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
    setCompletion(nextCompletion)
  }, [setCompletion, nextCompletion])

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
      <style jsx>{`
        .autocomplete {
          position: absolute;
          width: 100%;
          border-radius: 0.2rem;
          overflow: hidden;
          margin-top: -0.5rem;
          padding: 0;
          background: white;
        }
        li {
          list-style: none !important;
          margin: 0;
          background: rgba(0, 0, 0, 0.3);
          transition: all 50ms ease-in-out;
        }
        p {
          padding: 0.5rem 1rem;
          margin-bottom: 0;
          transition: all 50ms ease-in-out;
          cursor: pointer;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          color: rgba(0, 0, 0, 0.8);
        }
        li.selected {
          background: rgba(0, 0, 0, 0.4);
        }
        li.selected > p {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </ul>
  )
}

export default Autocomplete
