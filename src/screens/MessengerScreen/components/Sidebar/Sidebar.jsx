import React, { useEffect } from 'react'
import './Sidebar.styles.scss'
import { SidebarTop } from './components/SidebarTop'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../../features/userSlice'
import { SidebarBottom } from './components/SidebarBottom'
import { SidebarThread } from './components/SidebarThread'
import { setThreads } from '../../../../features/threadsSlice'
import {
  setDoc,
  doc,
  getDocs,
  query,
  collection
} from 'firebase/firestore'
import { db } from '../../../../firebase'

export const Sidebar = () => {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const getThreads = async () => {
    const q = query(collection(db, 'threads'))

    const querySnapshot = await getDocs(q)
    const threadsSnapshot = querySnapshot.docs.map((i) => ({
      id: i.id,
      ...i.data()
    }))
    try {
      dispatch(setThreads(threadsSnapshot))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getThreads()
  }, [])


  const handleAddThread = async () => {
    const threadName = prompt('enter')
    const newThread = {
      name: threadName,
      // date: Timestamp.fromDate(new Date())
    }
    await setDoc(doc(db, 'threads', newThread.name), newThread)
    getThreads()
  }

  return (
    <div className="sidebar">
      <SidebarTop user={user.user} handleAddThread={handleAddThread} />
      <SidebarThread />
      <SidebarBottom />
    </div>
  )
}
