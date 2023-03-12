import React from 'react'
import { Thread } from './Thread/Thread'
import { useDispatch, useSelector } from 'react-redux'
import { setChoosedThread } from '../../../../../features/choosedThreadSlice'
import { DARK, LIGHT } from '../../../../../utils/Theme/theme'
import { selectTheme } from '../../../../../features/themeSlice'

export const SidebarThread = ({ threads }) => {
  const dispatch = useDispatch()

  const setChoosedThreadToMessages = thread => {
    dispatch(setChoosedThread(thread))
  }

  const theme = useSelector(selectTheme)
  return (
    <div
      className='threads'
      style={{
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
      }}>
      {threads.map(i => (
        <Thread
          theme={theme.theme}
          onClick={() => setChoosedThreadToMessages(i)}
          key={i.id}
          id={i.id}
          name={i.name}
          date={i.date}
        />
      ))}
    </div>
  )
}
