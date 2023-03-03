import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/userSlice'
import { auth } from '../../firebase'
import './LoginScreen.styles.scss'

export const LoginScreen = () => {
  const dispatch = useDispatch()

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        dispatch(
          setUser({
            displayName: user.displayName,
            email: user.email,
            photo: user.photoURL,
            id: user.uid
          })
        )
      })
      .catch((error) => console.log(error.message))
  }

  return (
    <div className="login">
      <div className="login__modal">
        <h1>messenger</h1>
        <button onClick={googleSignIn}>login via google</button>
      </div>
    </div>
  )
}
