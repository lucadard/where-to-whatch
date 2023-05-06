import React, { useState } from 'react'

import PageLayout from '../components/PageLayout'
import ThemeSelector from '../components/ThemeSelector'
import Title from '../components/Title'
import Input from '../components/Input'
import ShowCard from '../components/ShowCard'

import { useShow } from '../context/ShowContext'

export default function App () {
  const [loading, setLoading] = useState(false)
  const { show } = useShow()

  return (
    <PageLayout title='Where to watch?'>
      <div className='relative flex flex-col items-center pt-10 md:pb-10 gap-6 transition-colors duration-300'>
        <Title />
        <Input loading={loading} />
        {show.id !== 'search' && <ShowCard setLoading={setLoading} />}
        <ThemeSelector />
      </div>
    </PageLayout>
  )
}
