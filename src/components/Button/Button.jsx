import React from 'react'
import './Button.styles.scss'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../features/themeSlice'

export const Button = ({ onClick, text }) => {
  const theme = useSelector(selectTheme)
  return (
    <button
      onClick={onClick}
      className={
        theme.theme === 'light'
          ? 'neumorph__button light__background light__shadow'
          : 'neumorph__button dark__background dark__shadow'
      }>
      <p className={theme.theme === 'light' ? 'light__color' : 'dark__color'}>
        {text}
      </p>
    </button>
  )
}
