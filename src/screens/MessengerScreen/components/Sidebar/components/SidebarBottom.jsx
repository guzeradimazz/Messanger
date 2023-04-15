import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../../../../features/userSlice'
import { setSettings } from '../../../../../features/settingsSlice'
import { selectTheme } from '../../../../../features/themeSlice'
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../imgs/Icons'
import { removeChoosedThread } from '../../../../../features/choosedThreadSlice'

export const SidebarBottom = () => {
  const dispatch = useDispatch()

  const theme = useSelector(selectTheme)

  const handleLogOut = () => {
    localStorage.clear()
    signOut(auth).then(() => {
      dispatch(logOut(null))
      dispatch(removeChoosedThread(null))
    })
  }

  const handleSetSettings = () => {
    dispatch(setSettings(true))
  }

  return (
    <footer
      className={
        theme.theme === 'light'
          ? 'sidebar__bottom light__background light__shadow'
          : 'sidebar__bottom dark__background dark__shadow'
      }>
      <div
        className={
          theme.theme === 'light'
            ? 'sidebar__bottom_logout bottom-btn light__shadow'
            : 'sidebar__bottom_logout bottom-btn dark__shadow'
        }
        style={{
          backgroundImage: `url(${
            theme.theme === 'light'
              ? DEFUALT_ICONS.Logout_def
              : NIGHT_ICONS.Logout_night
          })`,
        }}
        onClick={handleLogOut}
      />
      <div
        className={
          theme.theme === 'light'
            ? 'sidebar__bottom_settings bottom-btn light__shadow'
            : 'sidebar__bottom_settings bottom-btn dark__shadow'
        }
        style={{
          backgroundImage: `url(${
            theme.theme === 'light'
              ? DEFUALT_ICONS.Settings_def
              : NIGHT_ICONS.Settings_night
          })`,
        }}
        onClick={handleSetSettings}
      />
    </footer>
  )
}
