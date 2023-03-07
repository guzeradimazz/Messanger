import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/userSlice'
import './LoginScreen.styles.scss'
import { setUsers } from '../../features/usersSlice'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc
} from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { auth } from '../../firebase'
import { Button } from '../../components/Button/Button'

export const LoginScreen = () => {
  const dispatch = useDispatch()

  const googleSignIn = async () => {
    const firestore = getFirestore()
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const userRef = doc(firestore, 'users', user.uid)
      const userDoc = await getDoc(userRef)

      const newUser = {
        displayName: user.displayName,
        email: user.email,
        photo: user.photoURL,
        id: user.uid
      }

      if (!userDoc.exists()) {
        await setDoc(userRef, newUser)
      }

      dispatch(setUser(newUser))
    } catch (error) {
      console.log('[SETTING USER ERROR]')
      console.log(error.message)
    }

    try {
      const usersCollectionRef = collection(firestore, 'users')
      const usersSnapshot = await getDocs(usersCollectionRef)
      const users = []
      usersSnapshot.forEach((doc) => {
        const data = doc.data()
        users.push(data)
      })
      dispatch(setUsers(users))
    } catch (error) {
      console.log('[GETTING USERS ERROR]')
      console.log(error.message)
    }
  }

  return (
    <div className="login">
      <div className="login__modal">
        <h1>messenger</h1>
        <Button onClick={googleSignIn} text={'login'} />
      </div>
    </div>
  )
}
