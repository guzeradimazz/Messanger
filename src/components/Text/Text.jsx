import React from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../features/themeSlice'

export const Text = ({ label, classname, type }) => {
  const theme = useSelector(selectTheme)
  if (type === 'p') {
    return (
      <p
        className={
          theme.theme === 'light'
            ? `${classname} light__color`
            : `${classname} dark__color`
        }
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}>
        {label}
      </p>
    )
  } else if (type === 'h1') {
    return (
      <h1
        className={
          theme.theme === 'light'
            ? `${classname} light__color`
            : `${classname} dark__color`
        }
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}>
        {label}
      </h1>
    )
  } else if (type === 'h3') {
    return (
      <h3
        className={
          theme.theme === 'light'
            ? `${classname} light__color`
            : `${classname} dark__color`
        }
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}>
        {label}
      </h3>
    )
  }
}
