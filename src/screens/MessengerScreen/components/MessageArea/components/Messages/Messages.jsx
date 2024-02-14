import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../../../../features/userSlice'
import {
  selectCurrentMessages,
  setMessages,
} from '../../../../../../features/currentMessages'
import { Message } from './Message/Message'
import { selectUsers, setUsers } from '../../../../../../features/usersSlice'
import { query } from 'firebase/database'
import { db } from '../../../../../../firebase'
import { selectChoosedThread } from '../../../../../../features/choosedThreadSlice'
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore'

export const Messages = () => {
  const user = useSelector(selectUser)
  const users = useSelector(selectUsers)
  const messages = useSelector(selectCurrentMessages)
  const dispatch = useDispatch()
  const selectedThread = useSelector(selectChoosedThread)

  console.log('====================================');
  console.log(messages);
  console.log('====================================');
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

  const getUsers = async () => {
    const firestore = getFirestore()
    const usersCollectionRef = collection(firestore, 'users')
    const usersSnapshot = await getDocs(usersCollectionRef)
    const users = []
    usersSnapshot.forEach(doc => {
      const data = doc.data()
      users.push(data)
    })
    dispatch(setUsers(users))
  }

  useEffect(() => {
    getUsers()
    const threadId = selectedThread.choosedThread?.id
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
            picture={i.fileUrl}
            name={name}
            audioURL={i.audioURL}
            isCurrentUser={user.user.id === i.userId ? true : false}
          />
        )
      })}
    </div>
  )
}
