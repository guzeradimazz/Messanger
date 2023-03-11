import React, { useEffect, useState } from 'react'
import './MessageArea.styles.scss'
import { TopBar } from './components/TopBar/TopBar'
import { BottomBar } from './components/BottomBar/BottomBar'
import { Messages } from './components/Messages/Messages'
import { useDispatch, useSelector } from 'react-redux'
import { selectChoosedThread } from '../../../../features/choosedThreadSlice'
import { selectUser } from '../../../../features/userSlice'
import { addDoc, collection, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '../../../../firebase'
import { setMessages } from '../../../../features/currentMessages'
import { Plug } from './components/Plug/Plug'
import { onValue } from 'firebase/database'

export const MessageArea = () => {
  const dispatch = useDispatch()
  const selectedThread = useSelector(selectChoosedThread)
  const user = useSelector(selectUser)

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    if (user !== null && selectedThread !== null) {
      const threadId = selectedThread.choosedThread.id
      const messagesRef = collection(db, 'threads', threadId, 'messages')

      await addDoc(messagesRef, {
        userId: user.user.id,
        message: message,
        id: 'id' + Math.random().toString(16).slice(2),
        date: Timestamp.fromDate(new Date()).seconds,
      })
      try {
        getMessages()
      } catch (error) {
        console.log(error)
      }
      setMessage('')
    }
  }

  const getMessages = async () => {
    if (selectedThread.isSelected) {
      const threadId = selectedThread.choosedThread.id
      const messagesRef = collection(db, 'threads', threadId, 'messages')
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
    if (selectedThread.isSelected) {
      const threadId = selectedThread.choosedThread.id
      const messagesRef = collection(db, 'threads', threadId, 'messages')

      onValue(messagesRef, snapshot => {
        let unSortedMessages = []
        unSortedMessages = snapshot.val()
        unSortedMessages.sort((a, b) => a.date - b.date)
        dispatch(setMessages(unSortedMessages))
      })
    }
  }, [])

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
