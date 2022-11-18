import React, { useEffect } from 'react'

import { useTheme } from '../context/ThemeContext'

const ThemeSelector = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div
      className={`hidden md:block absolute right-0 top-0 md:mt-4 md:mr-6 w-[70px] h-[35px] rounded-full cursor-pointer 
      ${theme === 'light' ? 'bg-dark outline-dark' : 'bg-light outline-light'}`}
      onClick={toggleTheme}
    >
      <div className="w-1/2 h-full">
        <div
          className={`transition-transform w-full h-full scale-[0.7] duration-300 rounded-full
        ${theme === 'light' ? 'bg-light' : 'translate-x-full bg-dark'}`}
        />
      </div>
    </div>
  )
}

export default ThemeSelector
