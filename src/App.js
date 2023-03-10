/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import { LoginScreen } from './screens/LoginScreen/LoginScreen'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import { Messenger } from './screens/MessengerScreen/Messenger'
import { selectSettings } from './features/settingsSlice'
import { SettingsScreen } from './screens/SettingsScreen/SettingsScreen'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { removeChoosedThread } from './features/choosedThreadSlice'

function App() {
  const user = useSelector(selectUser)
  const settings = useSelector(selectSettings)
  const dispatch = useDispatch()

  useEffect(() => {
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

export default App
