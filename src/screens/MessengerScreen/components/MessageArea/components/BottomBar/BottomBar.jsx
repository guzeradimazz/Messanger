import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../features/themeSlice'
import { selectLanguage } from '../../../../../../features/languageSlice'
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../../imgs/Icons'
import { EmojiModal } from '../../../../../../components/EmojiModal/EmojiModal'

export const BottomBar = ({
  isRecording,
  audioURL,
  sendAudioMessage,
  startRecording,
  stopRecording,
  message,
  setMessage,
  sendMessage,
  setFile,
  file,
}) => {
  const [isShown, setIsShown] = useState(false)
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)

  const inputRef = useRef(null)
  const [key, setKey] = useState(0)

  const handleFileChange = event => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    setKey(prev => prev + 1)
  }

  const handleAudioMessage = e => {
    if (e.type === 'mousedown') startRecording()
    if (e.type === 'mouseup') {
      stopRecording()
    } else return
  }

  const handleAudioMessageMobile = () => {
    if (isRecording) stopRecording()
    else startRecording()
  }

  const handleSendMessage = e => {
    sendMessage(e)
  }

  useEffect(() => {
    if (audioURL) {
      sendAudioMessage()
    }
  }, [audioURL])

  return (
    <footer
      className={
        theme.theme === 'light'
          ? 'messagearea__bottom light__background light__shadow'
          : 'messagearea__bottom dark__background dark__shadow'
      }>
      <form onSubmit={e => handleSendMessage(e)}>
        <input
          ref={inputRef}
          autoFocus
          className={
            theme.theme === 'light'
              ? 'light__color light__background light__shadow'
              : 'dark__color dark__background dark__shadow'
          }
          type='text'
          name='message'
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={language.language === 'en' ? 'Message...' : 'Сообщение'}
        />
        <button className='file_upload'>
          <label
            htmlFor='file-upload'
            className={
              theme.theme === 'light'
                ? 'custom-file-upload light__background '
                : 'custom-file-upload dark__background '
            }
            style={{
              backgroundImage: `url(${
                theme.theme === 'light'
                  ? DEFUALT_ICONS.Clip_def
                  : NIGHT_ICONS.Clip_night
              })`,
            }}></label>
          {file && <div className='file_upload_dot' />}
          <input
            id='file-upload'
            accept='images/*'
            key={key}
            type='file'
            name='file'
            onChange={handleFileChange}
          />
        </button>
        <button
          onMouseEnter={() => setIsShown(prev => !prev)}
          onMouseLeave={() => setIsShown(prev => !prev)}
          className={
            theme.theme === 'light'
              ? 'emoji-btn light__background '
              : 'emoji-btn dark__background '
          }
          style={{
            backgroundImage: `url(${
              theme.theme === 'light'
                ? DEFUALT_ICONS.Smile_def
                : NIGHT_ICONS.Smile_night
            })`,
          }}
        />
        <EmojiModal
          onEmojiClick={item => setMessage(message + item.emoji)}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          isShown={isShown}
        />
        <button
          onClick={e => handleSendMessage(e)}
          className={
            theme.theme === 'light'
              ? 'sendbtn-web light__color light__background light__shadow'
              : 'sendbtn-web dark__color dark__background dark__shadow'
          }
          type='submit'>
          {language.language === 'en' ? 'send' : 'отправить'}
        </button>
        <button
          onClick={e => handleSendMessage(e)}
          className={
            theme.theme === 'light'
              ? 'mobile-btn-send  light__background '
              : 'mobile-btn-send  dark__background '
          }
          style={{
            backgroundImage: `url(${
              theme.theme === 'light'
                ? DEFUALT_ICONS.Send_def
                : NIGHT_ICONS.Send_night
            })`,
          }}
        />
        <button
          tabIndex={3}
          className={
            theme.theme === 'light'
              ? 'audiobutton  light__background light__shadow'
              : 'audiobutton  dark__background dark__shadow'
          }
          style={{
            transform: `scale(${isRecording ? '1.3' : '1'})`,
            backgroundImage: `url(${
              theme.theme === 'light'
                ? DEFUALT_ICONS.Micro_def
                : NIGHT_ICONS.Micro_night
            })`,
          }}
          onMouseDown={handleAudioMessage}
          onMouseUp={handleAudioMessage}
        />

        <button
          className={
            theme.theme === 'light'
              ? 'audiobuttonMobile  light__background light__shadow'
              : 'audiobuttonMobile  dark__background dark__shadow'
          }
          style={{
            transform: `scale(${isRecording ? '1.3' : '1'})`,
            backgroundImage: `url(${
              theme.theme === 'light'
                ? DEFUALT_ICONS.Micro_def
                : NIGHT_ICONS.Micro_night
            })`,
          }}
          onClick={handleAudioMessageMobile}
        />
      </form>
    </footer>
  )
}
