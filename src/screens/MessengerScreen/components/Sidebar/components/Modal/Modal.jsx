import React, { useState } from 'react'
import './Modal.styles.scss'
import { Button } from '../../../../../../components/Button/Button'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../features/themeSlice'
import { DARK, LIGHT } from '../../../../../../utils/Theme/theme'
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
      className='modal'
      style={{
        opacity: isModalShow ? '0' : '1',
        transition: 'all 0.3s',
        visibility: isModalShow ? 'hidden' : 'visible',
        transform: `translateY(${!isModalShow ? '0%' : '200%'})`,
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
        boxShadow: `${
          theme.theme === 'light'
            ? `2px 0 10px ${LIGHT.shadow}`
            : `2px 0 10px ${DARK.shadow}`
        }`,
      }}>
      <div className='modal__container'>
        <div
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
          maxLength={20}
          value={threadName}
          onChange={e => setThreadName(e.target.value)}
          type='text'
          placeholder={
            language.language === 'en' ? 'Type name of your chat' : 'Имя чата'
          }
        />
        <div className='file_upload'>
          <label
            htmlFor='file-upload2'
            className='custom-file-upload'
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
        </div>
        <Button
          onClick={handleAddThread}
          text={language.language === 'en' ? 'Create chat' : 'Создать чат'}
        />
      </div>
    </div>
  )
}
