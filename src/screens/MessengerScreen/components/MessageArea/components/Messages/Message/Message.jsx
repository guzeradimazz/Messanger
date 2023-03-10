import React from 'react'
import './Message.styles.scss'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../../features/themeSlice'

import { LIGHT, DARK } from '../../../../../../../utils/Theme/theme'
import { Text } from '../../../../../../../components/Text/Text'

export const Message = ({ message, photo, isCurrentUser }) => {
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
        <Text label={message} />
      </div>
    </div>
  )
}
