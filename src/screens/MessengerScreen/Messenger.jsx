import React from 'react'
import { useSelector } from 'react-redux'
import { MessageArea } from './components/MessageArea/MessageArea'
import { Sidebar } from './components/Sidebar/Sidebar'
import './Messenger.styles.scss'
import { selectTheme } from '../../features/themeSlice'
import { DARK, LIGHT } from '../../utils/Theme/theme'

export const Messenger = () => {
  const theme = useSelector(selectTheme)

  return (
    <div
      className='messenger'
      style={{
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
      }}>
      <Sidebar />
      <MessageArea />
    </div>
  )
}
