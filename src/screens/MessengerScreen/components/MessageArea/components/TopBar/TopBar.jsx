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
import { selectTheme } from '../../../../../../features/themeSlice'
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../../imgs/Icons'

export const TopBar = ({ isSidebarVisible, setSidebarVisibility }) => {
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
    <header
      className={
        theme.theme === 'light'
          ? 'messagearea__top light__shadow'
          : 'messagearea__top dark__shadow'
      }>
      <button
        style={{
          opacity: !selectedThread.isSelected ? '0' : '1',
          transition: 'all 0.3s',
          boxShadow: 'none',
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
      {isSidebarVisible ? null : (
        <button
          onClick={() => setSidebarVisibility(prev => !prev)}
          className='sidebar__close-mobile'
          style={{
            backgroundImage: `url(${
              theme.theme === 'light'
                ? DEFUALT_ICONS.Burger_def
                : NIGHT_ICONS.Burger_night
            })`,
          }}
        />
      )}
      <Text
        type={'h1'}
        label={
          selectedThread.choosedThread
            ? selectedThread.choosedThread.name
            : 'Messenger'
        }
        classname={'messagearea__top-headText'}
      />
      <button
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
    </header>
  )
}
