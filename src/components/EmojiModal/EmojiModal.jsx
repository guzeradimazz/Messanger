import EmojiPicker from 'emoji-picker-react'
import React from 'react'

export const EmojiModal = ({
  onEmojiClick,
  onMouseEnter,
  onMouseLeave,
  isShown,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className='emoji'
      style={{
        opacity: isShown ? '1' : '0',
        transition: 'all .3s ease',
        transform: `translateX(${isShown ? '0%' : '100%'}) scale(${
          isShown ? '1' : '0'
        })`,
      }}>
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  )
}
