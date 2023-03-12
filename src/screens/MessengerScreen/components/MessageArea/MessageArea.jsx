import React, { useEffect, useState } from 'react'
import './MessageArea.styles.scss'
import { TopBar } from './components/TopBar/TopBar'
import { BottomBar } from './components/BottomBar/BottomBar'
import { Messages } from './components/Messages/Messages'
import { useDispatch, useSelector } from 'react-redux'
import { selectChoosedThread } from '../../../../features/choosedThreadSlice'
import { selectUser } from '../../../../features/userSlice'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  Timestamp,
} from 'firebase/firestore'
import { setMessages } from '../../../../features/currentMessages'
import { Plug } from './components/Plug/Plug'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'

export const MessageArea = () => {
  const dispatch = useDispatch()
  const selectedThread = useSelector(selectChoosedThread)
  const user = useSelector(selectUser)

  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)

  const sendMessage = async e => {
    e.preventDefault()
    if (user !== null && selectedThread !== null) {
      const storage = getStorage()
      const storageRef = ref(storage, 'files/' + file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)

      const threadId = selectedThread.choosedThread.id
      const messagesRef = collection(
        getFirestore(),
        'threads',
        threadId,
        'messages'
      )

      // Track the upload progress
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
          // Handle successful uploads
          console.log('Upload successful')
          // Get the download URL for the file
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            addDoc(messagesRef, {
              userId: user.user.id,
              message: message | '',
              id: 'id' + Math.random().toString(16).slice(2),
              date: Timestamp.fromDate(new Date()).seconds,
              fileUrl: downloadURL,
              fileName: file.name,
            }).then(docRef => {
              // Update the message with the message ID
              setDoc(
                doc(
                  getFirestore(),
                  `threads/${threadId}/messages/${docRef.id}`
                ),
                {
                  messageId: docRef.id,
                },
                { merge: true }
              )
            })
          })
        }
      )
      try {
        getMessages()
      } catch (error) {
        console.log(error)
      }
      setMessage('')
      setFile(null)
    }
  }

  const getMessages = async () => {
    if (selectedThread.isSelected) {
      const threadId = selectedThread.choosedThread.id
      const messagesRef = collection(
        getFirestore(),
        'threads',
        threadId,
        'messages'
      )
      const messages = await getDocs(messagesRef)
      const unSortedMessages = []
      messages.forEach(doc => {
        const data = doc.data()
        unSortedMessages.push(data)
      })
      unSortedMessages.sort((a, b) => a.date - b.date)
      dispatch(setMessages(unSortedMessages))
    }
  }

  useEffect(() => {
    if (selectedThread.isSelected) getMessages()
  }, [selectedThread.isSelected, selectedThread.choosedThread])

  return (
    <div className='messagearea'>
      <TopBar />
      {selectedThread.isSelected ? (
        <div style={{ height: 'inherit' }}>
          <Messages />
          <BottomBar
            setFile={setFile}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      ) : (
        <Plug />
      )}
    </div>
  )
}
