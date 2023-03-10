import React from 'react'
import { Button } from '../../../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme, setTheme } from '../../../../features/themeSlice'
import { DARK, LIGHT } from '../../../../utils/Theme/theme'

const ThemeModify = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const handleChangeTheme = () => {
    console.log(theme)
    if (theme.theme === 'light') dispatch(setTheme('dark'))
    else if (theme.theme === 'dark') dispatch(setTheme('light'))
    else return null
  }
  return (
    <div className='themeModify'>
      <Button onClick={handleChangeTheme} text={'Switch Theme'} />
    </div>
  )
}

export const ToModify = ({ choice }) => {
  const theme = useSelector(selectTheme)
  return (
    <div
      className='settings__modify'
      style={{
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
      }}>
      {choice === 'theme' ? <ThemeModify /> : null}
    </div>
  )
}
