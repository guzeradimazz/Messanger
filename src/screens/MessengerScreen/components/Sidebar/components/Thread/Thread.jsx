import React from 'react'
import './Thread.styles.scss'
import { parseTime } from '../../../../../../utils/parseTime'
import { DARK, LIGHT } from '../../../../../../utils/Theme/theme'
import { Text } from '../../../../../../components/Text/Text'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../features/themeSlice'
import { selectChoosedThread } from '../../../../../../features/choosedThreadSlice'

export const Thread = ({ name, date, onClick, id, file }) => {
  const theme = useSelector(selectTheme)
  const selectedThread = useSelector(selectChoosedThread)
  return (
    <div
      className='threads__item'
      onClick={onClick}
      style={{
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
        boxShadow: `${
          selectedThread.isSelected
            ? selectedThread.choosedThread.id === id
              ? '0px 0 10px #ea9c5c'
              : theme.theme === 'light'
              ? `0px 0 10px ${LIGHT.shadow}`
              : `0px 0 10px ${DARK.shadow}`
            : theme.theme === 'light'
            ? `0px 0 10px ${LIGHT.shadow}`
            : `0px 0 10px ${DARK.shadow}`
        }`,
      }}>
      <img src={file ? file : 'https://picsum.photos/200/200'} alt='avatar' />
      <Text label={name} />
      <small>{parseTime(date)}</small>
    </div>
  )
}
