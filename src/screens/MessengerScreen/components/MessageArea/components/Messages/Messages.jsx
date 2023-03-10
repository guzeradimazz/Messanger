import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../../../features/userSlice'
import { selectCurrentMessages } from '../../../../../../features/currentMessages'
import { Message } from './Message/Message'
import { selectUsers } from '../../../../../../features/usersSlice'

export const Messages = () => {
  const user = useSelector(selectUser)
  const users = useSelector(selectUsers)
  const messages = useSelector(selectCurrentMessages)

  const setPhoto = userId => {
    let photo = ''
    users.users.map(item => {
      if (item.id === userId) photo = item.photo
    })
    return photo
  }

  return (
    <div className='messagearea__messages'>
      {messages.messages.map(i => {
        const photo = setPhoto(i.userId)
        return (
          <Message
            key={i.id}
            message={i.message}
            photo={photo}
            isCurrentUser={user.user.id === i.userId ? true : false}
          />
        )
      })}
    </div>
  )
}
