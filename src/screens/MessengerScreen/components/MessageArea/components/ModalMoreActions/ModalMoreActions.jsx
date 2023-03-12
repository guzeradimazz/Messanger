import './ModalMoreActions.styles.scss'
import React from 'react'
import { collection, deleteDoc, doc, getFirestore } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeChoosedThread,
  selectChoosedThread,
} from '../../../../../../features/choosedThreadSlice'
import { selectTheme } from '../../../../../../features/themeSlice'
import { LIGHT, DARK } from '../../../../../../utils/Theme/theme'
import { Text } from '../../../../../../components/Text/Text'
import { selectLanguage } from '../../../../../../features/languageSlice'
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../../imgs/Icons'

export const ModalMoreActions = ({ isModalShown, setModalShown }) => {
  const dispatch = useDispatch()
  const handleDeleteThread = async threadId => {
    const db = getFirestore()
    const threadRef = doc(collection(db, 'threads'), threadId)
    await deleteDoc(threadRef)
    dispatch(removeChoosedThread(null))
    setModalShown(false)
  }

  const currentThread = useSelector(selectChoosedThread)

  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
  return (
    <div
      className='modal-moreactions'
      style={{
        opacity: isModalShown ? '1' : '0',
        visibility: isModalShown ? 'visible' : 'hidden',
        transform: `translateX(${isModalShown ? '0%' : '200%'})`,
        boxShadow: `${
          theme.theme === 'light'
            ? `0px 0 10px ${LIGHT.shadow}`
            : `0px 0 10px ${DARK.shadow}`
        }`,
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
      }}>
      <div
        style={{
          backgroundImage: `url(${
            theme.theme === 'light'
              ? DEFUALT_ICONS.Close_def
              : NIGHT_ICONS.Close_night
          })`,
        }}
        className='close'
        onClick={() => setModalShown(prev => !prev)}
      />
      <ul>
        <li onClick={() => handleDeleteThread(currentThread.choosedThread.id)}>
          <div
            style={{
              backgroundImage: `url(${
                theme.theme === 'light'
                  ? DEFUALT_ICONS.Trash_def
                  : NIGHT_ICONS.Trash_night
              })`,
            }}
            className='trash'
          />
          <Text label={language.language === 'en' ? 'delete' : 'удалить'} />
        </li>
      </ul>
    </div>
  )
}
