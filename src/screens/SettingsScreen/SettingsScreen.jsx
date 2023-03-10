import React, { useState } from 'react'
import './SettingsScreen.styles.scss'
import { Sidebar } from './components/Sidebar/Sidebar'
import { ToModify } from './components/ToModify/ToModify'

export const SettingsScreen = () => {
  const [choice, setChoice] = useState('theme')
  return (
    <div className='settings'>
      <Sidebar setChoice={setChoice} />
      <ToModify choice={choice} setChoice={setChoice} />
    </div>
  )
}
