import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../../../../features/userSlice'
import { setSettings } from '../../../../../features/settingsSlice'
import { DARK, LIGHT } from '../../../../../utils/Theme/theme'
import { selectTheme } from '../../../../../features/themeSlice'

export const SidebarBottom = () => {
  const dispatch = useDispatch()

  const theme = useSelector(selectTheme)

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(logOut(null))
    })
  }

  const handleSetSettings = () => {
    dispatch(setSettings(true))
  }

  return (
    <div
      className='sidebar__bottom'
      style={{
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
      }}>
      <img
        style={{
          background: `${
            theme.theme === 'light' ? LIGHT.background : DARK.background
          }`,
          boxShadow: `${
            theme.theme === 'light'
              ? `2px 0 10px ${LIGHT.shadow}`
              : `2px 0 10px ${DARK.shadow}`
          }`,
        }}
        src='https://cdn-icons-png.flaticon.com/512/126/126467.png'
        alt='logout'
        onClick={handleLogOut}
      />
      <img
        style={{
          background: `${
            theme.theme === 'light' ? LIGHT.background : DARK.background
          }`,
          boxShadow: `${
            theme.theme === 'light'
              ? `2px 0 10px ${LIGHT.shadow}`
              : `2px 0 10px ${DARK.shadow}`
          }`,
        }}
        src='https://cdn-icons-png.flaticon.com/512/900/900797.png'
        alt='settings'
        onClick={handleSetSettings}
      />
    </div>
  )
}
