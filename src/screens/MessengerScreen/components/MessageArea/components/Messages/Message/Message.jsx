import React from 'react'
import './Message.styles.scss'

export const Message = ({ message }) => {
  return (
    <div className='message'>
      <img src="" alt="avatar" />
      <p>{message}</p>
    </div>
  )
}
