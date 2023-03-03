import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../../../firebase'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../../../features/userSlice'

export const SidebarBottom = () => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(logOut(null))
    })
  }

  return (
    <div className='sidebar__bottom'>
      <img
        src="https://cdn-icons-png.flaticon.com/512/9762/9762334.png"
        alt="logout"
        onClick={handleLogOut}
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/2956/2956958.png"
        alt="settings"
      />
    </div>
  )
}
