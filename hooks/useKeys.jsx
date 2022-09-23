import { useState, useEffect } from 'react'

export const useKeys = () => {
  const [key, setKey] = useState(undefined)

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key === 'ArrowUp') setKey('up')
      else if (e.key === 'ArrowDown') setKey('down')
      else if (e.key === 'ArrowLeft') setKey('left')
      else if (e.key === 'ArrowRight') setKey('right')
      else if (e.key === 'Enter') setKey('enter')
      else if (e.key === 'Tab') setKey('tab')
    }
  }, [])

  return { key, setKey }
}
