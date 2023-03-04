import React from 'react'

export const BottomBar = ({ message, setMessage, sendMessage }) => {
  return (
    <div className='messagearea__bottom'>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>send</button>
    </div>
  )
}
