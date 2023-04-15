import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MessageArea } from './components/MessageArea/MessageArea'
import { Sidebar } from './components/Sidebar/Sidebar'
import './Messenger.styles.scss'
import { selectTheme } from '../../features/themeSlice'

export const Messenger = () => {
  const theme = useSelector(selectTheme)

  const [isSidebarVisible, setSidebarVisibility] = useState(true)
  return (
    <div
      className={
        theme.theme === 'light'
          ? 'messenger light__background'
          : `messenger dark__background`
      }>
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
