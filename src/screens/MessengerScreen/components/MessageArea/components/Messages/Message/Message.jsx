import React from 'react'
import './Message.styles.scss'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../../features/themeSlice'

import { LIGHT, DARK } from '../../../../../../../utils/Theme/theme'
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
        className='message'
        style={{
          flexDirection: isCurrentUser ? 'row-reverse' : 'row',
          boxShadow: `${
            theme.theme === 'light'
              ? `0px 0 10px ${LIGHT.shadow}`
              : `0px 0 10px ${DARK.shadow}`
          }`,
          background: `${
            theme.theme === 'light' ? LIGHT.background : DARK.background
          }`,
        }}>
        <img src={photo} alt='avatar' />
        <div className='message__content'>
          {picture && (
            <img src={picture} className='message__content_img' alt='picture' />
          )}
          {audioURL && <audio src={audioURL} controls />}
          {message === 0 ? null : <Text label={message} />}
        </div>
        <p className='message__displayName'>{name}</p>
      </div>
    </div>
  )
}
