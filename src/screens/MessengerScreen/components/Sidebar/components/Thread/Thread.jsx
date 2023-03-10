import React from 'react'
import './Thread.styles.scss'
import { parseTime } from '../../../../../../utils/parseTime'
import { DARK, LIGHT } from '../../../../../../utils/Theme/theme'
import { Text } from '../../../../../../components/Text/Text'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../features/themeSlice'

export const Thread = ({ name, date, onClick }) => {
  const theme = useSelector(selectTheme)
  return (
    <div
      className='threads__item'
      onClick={onClick}
      style={{
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
        boxShadow: `${
          theme.theme === 'light'
            ? `0px 0 10px ${LIGHT.shadow}`
            : `0px 0 10px ${DARK.shadow}`
        }`,
      }}>
      <img
        src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
        alt='avatar'
      />
      <Text label={name} />
      <small>{parseTime(date)}</small>
    </div>
  )
}
