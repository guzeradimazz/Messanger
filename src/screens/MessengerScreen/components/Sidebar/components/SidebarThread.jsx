import React from 'react'
import { Thread } from './Thread/Thread'
import { useDispatch } from 'react-redux'
import { setChoosedThread } from '../../../../../features/choosedThreadSlice'

export const SidebarThread = ({threads}) => {
  const dispatch = useDispatch()

  const setChoosedThreadToMessages = (thread) => {
    dispatch(setChoosedThread(thread))
  }

  return (
    <div className="threads">
      {threads.map((i) => (
        <Thread
          onClick={()=>setChoosedThreadToMessages(i)}
          key={i.id}
          name={i.name}
          date={i.date}
        />
      ))}
    </div>
  )
}
