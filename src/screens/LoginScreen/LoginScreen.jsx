import { async } from '@firebase/util'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../../features/userSlice'
import { auth } from '../../firebase'
import './LoginScreen.styles.scss'

export const LoginScreen = () => {
  const dispatch = useDispatch()

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        dispatch(setUser(user))
      })
      .catch((error) => console.log(error.message))
  }

  useEffect(() => {}, [])

  return (
    <div className="login">
      <div className="login__modal">
        <h1>messenger</h1>
        <button onClick={googleSignIn}>login via google</button>
      </div>
    </div>
  )
}
