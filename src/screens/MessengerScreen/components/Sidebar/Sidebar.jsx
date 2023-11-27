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
  getFirestore,
  addDoc,
} from 'firebase/firestore'
import { db } from '../../../../firebase'
import { Modal } from './components/Modal/Modal'
import { selectTheme } from '../../../../features/themeSlice'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { ModalBot } from './components/ModalBot/ModalBot'

export const Sidebar = ({ isSidebarVisible, setSidebarVisibility }) => {
  const dispatch = useDispatch()
  const [isModalShow, setModalShow] = useState(true)
  const [isModalShowBot, setModalShowBot] = useState(true)
  const [threadName, setThreadName] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [currentThreads, setCurrentThreads] = useState([])
  const [fileModal, setFileModal] = useState(null)

  const user = useSelector(selectUser)
  const theme = useSelector(selectTheme)

  const getThreads = async () => {
    const q = query(collection(db, 'threads'))

    const querySnapshot = await getDocs(q)
    const threadsSnapshot = querySnapshot.docs.map(i => ({
      id: i.id,
      ...i.data(),
    }))
    threadsSnapshot.sort((a, b) => b.date - a.date)
    dispatch(setThreads(threadsSnapshot))
    setCurrentThreads(threadsSnapshot)
  }

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
    if (searchInput) {
      const searchArray = currentThreads.filter(item =>
        item.name.toLowerCase().includes(`${searchInput.toLowerCase()}`)
      )
      setCurrentThreads(searchArray)
    } else getThreads()
  }, [searchInput])

  const handleAddThread = async () => {
    if (fileModal === null && threadName.trim()) {
      const newThread = {
        name: threadName,
        userId: user.user.id,
        date: Timestamp.fromDate(new Date()).seconds,
      }
      await setDoc(doc(db, 'threads', newThread.name), newThread)
      getThreads()
      setModalShow(prev => !prev)
      setThreadName('')
    } else if (fileModal) {
      const storage = getStorage()
      const storageRef = ref(storage, 'filesthreads/' + fileModal.name)
      const uploadTask = uploadBytesResumable(storageRef, fileModal)
      const threadRef = collection(getFirestore(), 'threads')
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        error => {
          console.error(error)
        },
        () => {
          console.log('Upload successful')
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            addDoc(threadRef, {
              name: threadName,
              userId: user.user.id,
              date: Timestamp.fromDate(new Date()).seconds,
              file: downloadURL,
            })
          })
        }
      )
      setFileModal(null)
    } else {
      alert('Please, write thread name!')
      return
    }
  }

  return (
    <section
      className={
        theme.theme === 'light'
          ? 'sidebar light__background light__shadow'
          : 'sidebar dark__background dark__shadow'
      }
      style={{
        transform: `translateX(${isSidebarVisible ? '0' : '-200%'})`,
        opacity: `${isSidebarVisible ? '1' : '0'}`,
        zIndex: isSidebarVisible ? '123' : '-21',
      }}>
      <SidebarTop
        setSidebarVisibility={setSidebarVisibility}
        theme={theme.theme}
        user={user.user}
        setModalShow={setModalShow}
        setModalShowBot={setModalShowBot}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <SidebarThread
        threads={currentThreads}
        setSidebarVisibility={setSidebarVisibility}
      />
      <SidebarBottom />
      <Modal
        fileModal={fileModal}
        setFileModal={setFileModal}
        handleAddThread={handleAddThread}
        setModalShow={setModalShow}
        threadName={threadName}
        setThreadName={setThreadName}
        isModalShow={isModalShow}
      />
      <ModalBot
        fileModal={fileModal}
        setFileModal={setFileModal}
        handleAddThread={handleAddThread}
        setModalShow={setModalShowBot}
        threadName={threadName}
        setThreadName={setThreadName}
        isModalShow={isModalShowBot}
      />
    </section>
  )
}
