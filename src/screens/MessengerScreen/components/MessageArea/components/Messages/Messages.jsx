import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectChoosedThread } from '../../../../../../features/choosedThreadSlice'
import { selectUser } from '../../../../../../features/userSlice'
import { selectCurrentMessages } from '../../../../../../features/currentMessages'
import { Message } from './Message/Message'

export const Messages = () => {
  const dispatch = useDispatch()
  const selectedThread = useSelector(selectChoosedThread)
  const user = useSelector(selectUser)
  const messages = useSelector(selectCurrentMessages)
  return (
    <div className='messagearea__messages'>
      {messages.messages.map((i) => (
        <Message key={i.id} message={i.message} />
      ))}
    </div>
  )
}
