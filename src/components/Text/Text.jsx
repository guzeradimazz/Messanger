import React from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../features/themeSlice'
import { DARK, LIGHT } from '../../utils/Theme/theme'

export const Text = ({ label, classname }) => {
  const theme = useSelector(selectTheme)
  return (
    <p
      className={classname}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        color: `${theme.theme === 'light' ? LIGHT.textColor : DARK.textColor}`,
      }}>
      {label}
    </p>
  )
}
