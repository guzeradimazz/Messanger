import React, { useEffect, useState } from 'react'
import './Sidebar.styles.scss'
import { SidebarTop } from './components/SidebarTop'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../../features/userSlice'
import { SidebarBottom } from './components/SidebarBottom'
import { SidebarThread } from './components/SidebarThread'
import { selectThreads, setThreads } from '../../../../features/threadsSlice'
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
  const [isModalShow, setModalShow] = useState(true)
  const [threadName, setThreadName] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [currentThreads, setCurrentThreads] = useState([])

  const user = useSelector(selectUser)
  const threads = useSelector(selectThreads)

  const getThreads = async () => {
    const q = query(collection(db, 'threads'))

    const querySnapshot = await getDocs(q)
    const threadsSnapshot = querySnapshot.docs.map((i) => ({
      id: i.id,
      ...i.data()
    }))
    const temp = threadsSnapshot.sort((a, b) => b.date - a.date)
    dispatch(setThreads(temp))
    setCurrentThreads(temp)
  }

  useEffect(() => {
    getThreads()
  }, [])

  useEffect(() => {
    if (searchInput) {
      const searchArray = currentThreads.filter((item) =>
        item.name.toLowerCase().includes(`${searchInput.toLowerCase()}`)
      )
      setCurrentThreads(searchArray)
      console.log(currentThreads)
    } else getThreads()
  }, [searchInput])

  const handleAddThread = async () => {
    if (threadName) {
      const newThread = {
        name: threadName,
        userId: user.user.id,
        date: Timestamp.fromDate(new Date()).seconds,
        messages: []
      }
      await setDoc(doc(db, 'threads', newThread.name), newThread)
      getThreads()
      setModalShow((prev) => !prev)
      setThreadName('')
    }
  }

  return (
    <div className="sidebar">
      <SidebarTop
        user={user.user}
        setModalShow={setModalShow}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <SidebarThread threads={currentThreads} />
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
