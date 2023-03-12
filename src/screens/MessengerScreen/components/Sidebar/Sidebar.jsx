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
  Timestamp,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../../../firebase'
import { Modal } from './components/Modal/Modal'
import { selectChoosedThread } from '../../../../features/choosedThreadSlice'
import { selectTheme } from '../../../../features/themeSlice'
import { DARK, LIGHT } from '../../../../utils/Theme/theme'

export const Sidebar = () => {
  const dispatch = useDispatch()
  const [isModalShow, setModalShow] = useState(true)
  const [threadName, setThreadName] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [currentThreads, setCurrentThreads] = useState([])

  const user = useSelector(selectUser)
  const choosedThread = useSelector(selectChoosedThread)
  const theme = useSelector(selectTheme)

  const getThreads = async () => {
    const q = query(collection(db, 'threads'))

    const querySnapshot = await getDocs(q)
    const threadsSnapshot = querySnapshot.docs.map(i => ({
      id: i.id,
      ...i.data(),
    }))
    const temp = threadsSnapshot.sort((a, b) => b.date - a.date)
    dispatch(setThreads(temp))
    setCurrentThreads(temp)
  }

  useEffect(() => {
    getThreads()
  }, [])

  useEffect(() => {
    const threadsRef = collection(db, 'threads')
    const threadsQuery = query(threadsRef)
    const unsubscribe = onSnapshot(threadsQuery, snapshot => {
      const threads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      threads.sort((a, b) => a.date - b.date)
      dispatch(setThreads(threads))
      setCurrentThreads(threads)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    getThreads()
  }, [choosedThread.isSelected])

  useEffect(() => {
    if (searchInput) {
      const searchArray = currentThreads.filter(item =>
        item.name.toLowerCase().includes(`${searchInput.toLowerCase()}`)
      )
      setCurrentThreads(searchArray)
    } else getThreads()
  }, [searchInput])

  const handleAddThread = async () => {
    if (threadName) {
      const newThread = {
        name: threadName,
        userId: user.user.id,
        date: Timestamp.fromDate(new Date()).seconds,
      }
      await setDoc(doc(db, 'threads', newThread.name), newThread)
      getThreads()
      setModalShow(prev => !prev)
      setThreadName('')
    }
  }

  return (
    <div
      className='sidebar'
      style={{
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
        boxShadow: `${
          theme.theme === 'light'
            ? `2px 0 10px ${LIGHT.shadow}`
            : `2px 0 10px ${DARK.shadow}`
        }`,
      }}>
      <SidebarTop
        theme={theme.theme}
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
