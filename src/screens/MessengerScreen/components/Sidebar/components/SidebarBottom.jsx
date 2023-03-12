import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../../../../features/userSlice'
import { setSettings } from '../../../../../features/settingsSlice'
import { DARK, LIGHT } from '../../../../../utils/Theme/theme'
import { selectTheme } from '../../../../../features/themeSlice'
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../imgs/Icons'

export const SidebarBottom = () => {
  const dispatch = useDispatch()

  const theme = useSelector(selectTheme)

  const handleLogOut = () => {
    localStorage.clear()
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
      <div
        className='sidebar__bottom_logout bottom-btn'
        style={{
          backgroundImage: `url(${
            theme.theme === 'light'
              ? DEFUALT_ICONS.Logout_def
              : NIGHT_ICONS.Logout_night
          })`,
          boxShadow: `${
            theme.theme === 'light'
              ? `2px 0 10px ${LIGHT.shadow}`
              : `2px 0 10px ${DARK.shadow}`
          }`,
        }}
        onClick={handleLogOut}
      />
      <div
        className='sidebar__bottom_settings bottom-btn'
        style={{
          backgroundImage: `url(${
            theme.theme === 'light'
              ? DEFUALT_ICONS.Settings_def
              : NIGHT_ICONS.Settings_night
          })`,
          boxShadow: `${
            theme.theme === 'light'
              ? `2px 0 10px ${LIGHT.shadow}`
              : `2px 0 10px ${DARK.shadow}`
          }`,
        }}
        onClick={handleSetSettings}
      />
    </div>
  )
}
