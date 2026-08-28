import MessagesPage from '@/src/features/user/chat/pages/page'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessagesPage/>
    </Suspense>
  )
}

export default page