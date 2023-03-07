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
        src="https://cdn-icons-png.flaticon.com/512/126/126467.png"
        alt="logout"
        onClick={handleLogOut}
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/900/900797.png"
        alt="settings"
      />
    </div>
  )
}
