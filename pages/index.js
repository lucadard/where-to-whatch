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
      <div className='w-full max-w-2xl mx-auto items-center gap-6 transition-colors duration-300'>
        <Title />
        <Input loading={loading} />
        {show.id !== 'search' && <ShowCard setLoading={setLoading} />}
        <ThemeSelector />
      </div>
    </PageLayout>
  )
}
