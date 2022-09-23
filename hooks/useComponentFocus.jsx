import { useEffect, useState } from 'react'

export const useComponentFocus = (ref) => {
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) =>
      setFocus(() => {
        let condition = ref.current && !ref.current.contains(event.target)
        // console.log(condition ? 'click out!' : 'click in!')
        return condition ? false : true
      })

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref])

  return {
    focus,
    forceFocus: (value) => setFocus(value)
  }
}
