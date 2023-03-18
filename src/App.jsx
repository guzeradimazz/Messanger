import './App.css'
import { useSelector } from 'react-redux'
import { selectUser, setUser } from './features/userSlice'
import { Messenger } from './screens/MessengerScreen/Messenger'
import { selectSettings } from './features/settingsSlice'
import { SettingsScreen } from './screens/SettingsScreen/SettingsScreen'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { removeChoosedThread } from './features/choosedThreadSlice'
import { LoginScreen } from './screens/LoginScreen/LoginScreen'
import React from 'react'

export const App = () => {
  const user = useSelector(selectUser)

  const settings = useSelector(selectSettings)
  const dispatch = useDispatch()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        console.log('Разрешение на использование медиа получено')
      })
      .catch(error => {
        console.error(
          'Ошибка при запросе разрешения на использование медиа',
          error
        )
      })
    try {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        const user = JSON.parse(savedUser)
        dispatch(setUser(user))
      }
    } catch (error) {
      console.log('[NO USERS IN LOCAL STORAGE]')
    }
    dispatch(removeChoosedThread(null))
  }, [])

  return (
    <div className='App'>
      {user.user ? (
        settings.settings ? (
          <SettingsScreen />
        ) : (
          <Messenger />
        )
      ) : (
        <LoginScreen />
      )}
    </div>
  )
}
