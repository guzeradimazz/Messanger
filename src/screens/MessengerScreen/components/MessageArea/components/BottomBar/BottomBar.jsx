import React from 'react'
import { Button } from '../../../../../../components/Button/Button'

export const BottomBar = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="messagearea__bottom">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message..."
      />
      <Button onClick={message ? sendMessage : () => {}} text={'send'} />
    </div>
  )
}
