import React from 'react'
import { MessageArea } from './components/MessageArea/MessageArea'
import { Sidebar } from './components/Sidebar/Sidebar'
import './Messenger.styles.scss'

export const Messenger = () => {


  return (
    <div className='messenger'>
      <Sidebar/>
      <MessageArea/>
    </div>
  )
}
