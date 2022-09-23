import React from 'react'

import PageLayout from '../components/PageLayout'
import Input from '../components/Input'
import ShowCard from '../components/ShowCard'

import { useShow } from '../context/ShowContext'

export default function Show() {
  const { show } = useShow()

  return (
    <PageLayout title="Where to watch?">
      <div className="flex flex-col items-center gap-6 mx-3 md:mx-0 mt-24">
        <Input />
        {show.id !== 'search' && <ShowCard />}
      </div>
    </PageLayout>
  )
}
