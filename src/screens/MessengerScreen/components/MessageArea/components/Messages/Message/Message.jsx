import React from 'react'
import './Message.styles.scss'

export const Message = ({ message, photo, isCurrentUser }) => {
  return (
    <div
      className={'message__wrapper'}
      style={{ flexDirection: isCurrentUser ? 'row-reverse' : 'row' }}
    >
      <div
        className="message"
        style={{ flexDirection: isCurrentUser ? 'row-reverse' : 'row' }}
      >
        <img src={photo} alt="avatar" />
        <p>{message}</p>
      </div>
    </div>
  )
}
