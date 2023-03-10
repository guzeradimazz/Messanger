import React from 'react'
import './Button.styles.scss'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../features/themeSlice'
import { DARK, LIGHT } from '../../utils/Theme/theme'

export const Button = ({ onClick, text }) => {
  const theme = useSelector(selectTheme)
  return (
    <div
      className='neumorph__button'
      onClick={onClick}
      style={{
        boxShadow: `0 0 7px ${
          theme.theme === 'light' ? LIGHT.shadow : DARK.shadow
        }`,
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
      }}>
      <p
        style={{
          color: `${
            theme.theme === 'light' ? LIGHT.textColor : DARK.textColor
          }`,
        }}>
        {text}
      </p>
    </div>
  )
}
