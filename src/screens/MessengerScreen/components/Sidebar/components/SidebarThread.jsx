import React, { useEffect, useState } from 'react'
import { Thread } from './Thread/Thread'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../../../../firebase'
import { useDispatch } from 'react-redux'
import { setChoosedThread } from '../../../../../features/choosedThreadSlice'

export const SidebarThread = () => {
  const [sortedThreads, setSortedThreads] = useState([])
  const dispatch = useDispatch()

  const getThreads = async () => {
    const q = query(collection(db, 'threads'))

    const querySnapshot = await getDocs(q)
    const threadsSnapshot = querySnapshot.docs.map((i) => ({
      id: i.id,
      ...i.data()
    }))
    try {
      setSortedThreads(threadsSnapshot.sort((a, b) => b.date - a.date))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getThreads()
  }, [])

  const setChoosedThreadToMessages = (thread) => {
    dispatch(setChoosedThread(thread))
  }

  return (
    <div className="threads">
      {sortedThreads.map((i) => (
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
