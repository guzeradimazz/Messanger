import React from 'react'
import { Thread } from './Thread/Thread'
import { useSelector } from 'react-redux'
import { selectThreads } from '../../../../../features/threadsSlice'

export const SidebarThread = () => {
  const threads = useSelector(selectThreads)
  console.log(threads);
  return (
    <div className="threads">
      {threads.threads.map((i) => (
        <Thread key={i.id} name={i.name} />
      ))}
    </div>
  )
}
