import React, { useEffect, useState } from 'react'
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
  collection,
  Timestamp
} from 'firebase/firestore'
import { db } from '../../../../firebase'
import { Modal } from './components/Modal/Modal'

export const Sidebar = () => {
  const dispatch = useDispatch()
  const [isModalShow, setModalShow] = useState(false)
  const [threadName, setThreadName] = useState('')

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
    if (threadName) {
      const newThread = {
        name: threadName,
        userId: user.user.id,
        date: Timestamp.fromDate(new Date()).seconds
      }
      try {
        await setDoc(doc(db, 'threads', newThread.name), newThread)
        getThreads()
      } catch (error) {
        console.log(error)
      } finally {
        setModalShow((prev) => !prev)
        setThreadName('')
      }
    }
  }

  return (
    <div className="sidebar">
      <SidebarTop user={user.user} setModalShow={setModalShow} />
      <SidebarThread />
      <SidebarBottom />
      <Modal
        handleAddThread={handleAddThread}
        setModalShow={setModalShow}
        threadName={threadName}
        setThreadName={setThreadName}
        isModalShow={isModalShow}
      />
    </div>
  )
}
