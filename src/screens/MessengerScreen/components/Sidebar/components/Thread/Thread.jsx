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
    <li
      onClick={onClick}
      className={
        theme.theme === 'light'
          ? 'threads__item light__background light__shadow'
          : 'threads__item dark__background dark__shadow'
      }
      style={{
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
      <img src={file ? file : 'https://random.imagecdn.app/200/200'} alt='avatar' />
      <Text type={'p'} label={name} />
      <small>{parseTime(date)}</small>
    </li>
  )
}
