import React from 'react'
import './Message.styles.scss'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../../features/themeSlice'

import { Text } from '../../../../../../../components/Text/Text'

export const Message = ({
  message,
  photo,
  isCurrentUser,
  name,
  picture,
  audioURL,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <div
      className={'message__wrapper'}
      style={{
        flexDirection: isCurrentUser ? 'row-reverse' : 'row',
      }}>
      <div
        className={
          theme.theme === 'light'
            ? 'message light__background light__shadow'
            : 'message dark__background dark__shadow'
        }
        style={{
          flexDirection: isCurrentUser ? 'row-reverse' : 'row',
        }}>
        <img src={photo} alt='avatar' />
        <div className='message__content'>
          {picture && (
            <img src={picture} className='message__content_img' alt='picture' />
          )}
          {audioURL && (
            <audio controls onClick={e => e.target.play()}>
              <source src={audioURL}></source>
            </audio>
          )}
          {message === 0 ? null : <Text type={'p'} label={message} />}
        </div>
        <p className='message__displayName'>{name}</p>
      </div>
    </div>
  )
}
