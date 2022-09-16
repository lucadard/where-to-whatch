import { useState, useEffect } from 'react'

export const useKeys = () => {
  const [keys, setKeys] = useState({ up: false, down: false })

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key === 'ArrowUp') setKeys({ up: true, down: false })
      else if (e.key === 'ArrowDown') setKeys({ up: false, down: true })
      else setKeys({ up: false, down: false })
    }
  }, [])

  return { keys }
}
