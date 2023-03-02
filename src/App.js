import './App.css'
import { LoginScreen } from './screens/LoginScreen/LoginScreen'

function App() {

  const user = null
  return <div className="App">
    {
      user ? null : <LoginScreen/>
    }
  </div>
}

export default App
