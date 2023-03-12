import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../features/themeSlice'
import { LIGHT, DARK } from '../../../../../../utils/Theme/theme'
import { selectLanguage } from '../../../../../../features/languageSlice'
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../../imgs/Icons'

export const BottomBar = ({ message, setMessage, sendMessage, setFile }) => {
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
      <form onSubmit={e => sendMessage(e)}>
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
          name='message'
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={language.language === 'en' ? 'Message...' : 'Сообщение'}
        />
        <div className='file_upload'>
          <label
            htmlFor='file-upload'
            className='custom-file-upload'
            style={{
              backgroundImage: `url(${
                theme.theme === 'light'
                  ? DEFUALT_ICONS.Clip_def
                  : NIGHT_ICONS.Clip_night
              })`,
            }}></label>
          <input
            id='file-upload'
            accept='images/*'
            type='file'
            name='file'
            onChange={e => setFile(e.target.files[0])}
          />
        </div>
        <div
          onMouseEnter={() => setIsShown(prev => !prev)}
          onMouseLeave={() => setIsShown(prev => !prev)}
          className='emoji-btn'
          style={{
            backgroundImage: `url(${
              theme.theme === 'light'
                ? DEFUALT_ICONS.Smile_def
                : NIGHT_ICONS.Smile_night
            })`,
          }}
        />
        <div
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          className='emoji'
          style={{
            opacity: isShown ? '1' : '0',
            transition: 'all .3s ease',
            transform: `translateX(${isShown ? '0%' : '100%'}) scale(${
              isShown ? '1' : '0'
            })`,
          }}>
          <EmojiPicker
            onEmojiClick={item => setMessage(message + item.emoji)}
          />
        </div>
        <button onClick={e => sendMessage(e)} type='submit'>
          {language.language === 'en' ? 'send' : 'отправить'}
        </button>
      </form>
    </div>
  )
}
