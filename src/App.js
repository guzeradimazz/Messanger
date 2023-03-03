import './App.css'
import { LoginScreen } from './screens/LoginScreen/LoginScreen'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import { Messenger } from './screens/MessengerScreen/Messenger'

function App() {
  const user = useSelector(selectUser)

  return <div className="App">{user.user ? <Messenger /> : <LoginScreen />}</div>
}

export default App
