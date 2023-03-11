import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../../../../features/userSlice'
import {
  selectCurrentMessages,
  setMessages,
} from '../../../../../../features/currentMessages'
import { Message } from './Message/Message'
import { selectUsers } from '../../../../../../features/usersSlice'
import { query } from 'firebase/database'
import { db } from '../../../../../../firebase'
import { selectChoosedThread } from '../../../../../../features/choosedThreadSlice'
import { collection, onSnapshot } from 'firebase/firestore'

export const Messages = () => {
  const user = useSelector(selectUser)
  const users = useSelector(selectUsers)
  const messages = useSelector(selectCurrentMessages)
  const dispatch = useDispatch()
  const selectedThread = useSelector(selectChoosedThread)

  const setPhoto = userId => {
    let photo = ''
    users.users.map(item => {
      if (item.id === userId) photo = item.photo
    })
    return photo
  }

  const setName = userId => {
    let name = ''
    users.users.map(item => {
      if (item.id === userId) name = item.displayName
    })
    return name
  }

  useEffect(() => {
    const threadId = selectedThread.choosedThread.id
    const messagesRef = collection(db, 'threads', threadId, 'messages')
    const messagesQuery = query(messagesRef)
    const unsubscribe = onSnapshot(messagesQuery, snapshot => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      messages.sort((a, b) => a.date - b.date)
      dispatch(setMessages(messages))
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className='messagearea__messages'>
      {messages.messages.map(i => {
        const photo = setPhoto(i.userId)
        const name = setName(i.userId)
        return (
          <Message
            key={i.id}
            message={i.message}
            photo={photo}
            name={name}
            isCurrentUser={user.user.id === i.userId ? true : false}
          />
        )
      })}
    </div>
  )
}
