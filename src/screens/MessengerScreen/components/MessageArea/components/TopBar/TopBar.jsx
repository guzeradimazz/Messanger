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
      <img
        style={{
          opacity: !selectedThread.isSelected ? '0' : '1',
          transition: 'all 0.3s',
          visibility: !selectedThread.isSelected ? 'hidden' : 'visible',
        }}
        src='https://cdn-icons-png.flaticon.com/512/130/130882.png'
        alt='<'
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
      <img
        style={{
          opacity: !selectedThread.isSelected ? '0' : '1',
          transition: 'all 0.3s',
          visibility: !selectedThread.isSelected ? 'hidden' : 'visible',
        }}
        src='https://cdn-icons-png.flaticon.com/512/512/512142.png'
        alt='...'
        onClick={() => setModalShown(prev => !prev)}
      />
      <ModalMoreActions
        isModalShown={isModalShown}
        setModalShown={setModalShown}
      />
    </div>
  )
}
