import React, { useState } from 'react'
import './TopBar.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectChoosedThread,
  removeChoosedThread,
} from '../../../../../../features/choosedThreadSlice'
import { ModalMoreActions } from '../ModalMoreActions/ModalMoreActions'
import { setMessages } from '../../../../../../features/currentMessages'
import { Text } from '../../../../../../components/Text/Text'
import { DARK, LIGHT } from '../../../../../../utils/Theme/theme'
import { selectTheme } from '../../../../../../features/themeSlice'
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../../imgs/Icons'

export const TopBar = () => {
  const selectedThread = useSelector(selectChoosedThread)
  const theme = useSelector(selectTheme)
  const dispatch = useDispatch()

  const [isModalShown, setModalShown] = useState(false)

  const deleteSelectionThread = () => {
    dispatch(removeChoosedThread(null))
    setModalShown(false)
    dispatch(setMessages([]))
  }
  return (
    <div
      className='messagearea__top'
      style={{
        borderBottom: `0.3px solid ${
          theme.theme === 'light' ? LIGHT.shadow : DARK.shadow
        }`,
      }}>
      <div
        style={{
          opacity: !selectedThread.isSelected ? '0' : '1',
          transition: 'all 0.3s',
          visibility: !selectedThread.isSelected ? 'hidden' : 'visible',
          backgroundImage: `url(${
            theme.theme === 'light'
              ? DEFUALT_ICONS.Back_def
              : NIGHT_ICONS.Back_night
          })`,
        }}
        className='back-icon'
        onClick={deleteSelectionThread}
      />
      <Text
        label={
          selectedThread.choosedThread
            ? selectedThread.choosedThread.name
            : 'Messenger'
        }
        classname={'messagearea__top-headText'}
      />
      <div
        style={{
          opacity: !selectedThread.isSelected ? '0' : '1',
          transition: 'all 0.3s',
          visibility: !selectedThread.isSelected ? 'hidden' : 'visible',
          backgroundImage: `url(${
            theme.theme === 'light'
              ? DEFUALT_ICONS.Dots_def
              : NIGHT_ICONS.Dots_night
          })`,
        }}
        className='dots-icon'
        onClick={() => setModalShown(prev => !prev)}
      />
      <ModalMoreActions
        isModalShown={isModalShown}
        setModalShown={setModalShown}
      />
    </div>
  )
}
