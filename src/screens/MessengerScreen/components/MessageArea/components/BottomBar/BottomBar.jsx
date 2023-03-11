import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'
import { Button } from '../../../../../../components/Button/Button'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../features/themeSlice'
import { LIGHT, DARK } from '../../../../../../utils/Theme/theme'
import { selectLanguage } from '../../../../../../features/languageSlice'

export const BottomBar = ({ message, setMessage, sendMessage }) => {
  const [isShown, setIsShown] = useState(false)
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)

  return (
    <div
      className='messagearea__bottom'
      style={{
        boxShadow: `0 -2px 6px ${
          theme.theme === 'light' ? LIGHT.shadow : DARK.shadow
        }`,
      }}>
      <input
        style={{
          boxShadow: `${
            theme.theme === 'light'
              ? `0px 0 10px ${LIGHT.shadow}`
              : `0px 0 10px ${DARK.shadow}`
          }`,
          background: `${
            theme.theme === 'light' ? LIGHT.background : DARK.background
          }`,
          color: `${
            theme.theme === 'light' ? LIGHT.textColor : DARK.textColor
          }`,
        }}
        type='text'
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder={language.language === 'en' ? 'Message...' : 'Сообщение'}
      />
      <img
        onMouseEnter={() => setIsShown(prev => !prev)}
        onMouseLeave={() => setIsShown(prev => !prev)}
        className='emoji-btn'
        alt='icon'
        src={
          isShown
            ? 'https://cdn-icons-png.flaticon.com/512/1933/1933691.png'
            : 'https://cdn-icons-png.flaticon.com/512/1933/1933704.png'
        }
      />
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className='emoji'
        style={{
          opacity: isShown ? '1' : '0',
          transition: 'all .3s ease',
          transform: `translateY(${isShown ? '0%' : '100%'}) scale(${
            isShown ? '1' : '0'
          })`,
        }}>
        <EmojiPicker onEmojiClick={item => setMessage(message + item.emoji)} />
      </div>
      <Button
        onClick={message ? sendMessage : () => {}}
        text={language.language === 'en' ? 'send' : 'отправить'}
      />
    </div>
  )
}
