import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MessageArea } from './components/MessageArea/MessageArea'
import { Sidebar } from './components/Sidebar/Sidebar'
import './Messenger.styles.scss'
import { selectTheme } from '../../features/themeSlice'
import { DARK, LIGHT } from '../../utils/Theme/theme'

export const Messenger = () => {
  const theme = useSelector(selectTheme)

  const [isSidebarVisible, setSidebarVisibility] = useState(true)
  return (
    <div
      className='messenger'
      style={{
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
      }}>
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setSidebarVisibility={setSidebarVisibility}
      />
      <MessageArea
        isSidebarVisible={isSidebarVisible}
        setSidebarVisibility={setSidebarVisibility}
      />
    </div>
  )
}
