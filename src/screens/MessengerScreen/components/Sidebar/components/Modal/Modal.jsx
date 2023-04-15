import React, { useState } from 'react'
import './Modal.styles.scss'
import { Button } from '../../../../../../components/Button/Button'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../features/themeSlice'
import { selectLanguage } from '../../../../../../features/languageSlice'
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../../imgs/Icons'

export const Modal = ({
  handleAddThread,
  setModalShow,
  threadName,
  setThreadName,
  isModalShow,
  setFileModal,
  fileModal,
}) => {
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)

  const [key2, setKey2] = useState(0)

  const handleFileChangeModal = event => {
    const selectedFile = event.target.files[0]
    setFileModal(selectedFile)
    setKey2(prev => prev + 1)
  }

  return (
    <div
      className={
        theme.theme === 'light'
          ? 'modal light__background light__shadow'
          : 'modal dark__background dark__shadow'
      }
      style={{
        opacity: isModalShow ? '0' : '1',
        transition: 'all 0.3s',
        visibility: isModalShow ? 'hidden' : 'visible',
        transform: `translateY(${!isModalShow ? '0%' : '200%'})`,
      }}>
      <div className='modal__container'>
        <div
          tabIndex={2}
          onClick={() => setModalShow(prev => !prev)}
          className='modal__container-close'
          style={{
            backgroundImage: `url(${
              theme.theme === 'light'
                ? DEFUALT_ICONS.Close_def
                : NIGHT_ICONS.Close_night
            })`,
          }}
        />
        <input
          className={
            theme.theme === 'light'
              ? 'light__color light__background light__shadow'
              : 'dark__color dark__background dark__shadow'
          }
          maxLength={20}
          value={threadName}
          onChange={e => setThreadName(e.target.value)}
          type='text'
          placeholder={
            language.language === 'en' ? 'Type name of your chat' : 'Имя чата'
          }
        />
        <button className='file_upload'>
          <label
            htmlFor='file-upload2'
            className={
              theme.theme === 'light'
                ? 'custom-file-upload light__background light__shadow'
                : 'custom-file-upload dark__background dark__shadow'
            }
            style={{
              backgroundImage: `url(${
                theme.theme === 'light'
                  ? DEFUALT_ICONS.Clip_def
                  : NIGHT_ICONS.Clip_night
              })`,
            }}></label>
          {fileModal && <div className='file_upload_dot' />}
          <input
            id='file-upload2'
            accept='images/*'
            key={key2}
            type='file'
            name='fileModal'
            onChange={handleFileChangeModal}
          />
        </button>
        <Button
          onClick={handleAddThread}
          text={language.language === 'en' ? 'Create chat' : 'Создать чат'}
        />
      </div>
    </div>
  )
}
