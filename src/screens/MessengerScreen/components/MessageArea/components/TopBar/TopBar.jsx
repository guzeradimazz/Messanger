import React, { useState } from 'react'
import './TopBar.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectChoosedThread,
  removeChoosedThread
} from '../../../../../../features/choosedThreadSlice'
import { ModalMoreActions } from '../ModalMoreActions/ModalMoreActions'
import { setMessages } from '../../../../../../features/currentMessages'

export const TopBar = () => {
  const selectedThread = useSelector(selectChoosedThread)

  const [isModalShown, setModalShown] = useState(false)
  const dispatch = useDispatch()

  const deleteSelectionThread = () => {
    dispatch(removeChoosedThread(null))
    setModalShown(false)
    dispatch(setMessages([]))
  }
  return (
    <div className="messagearea__top">
      <img
        style={{
          opacity: !selectedThread.isSelected ? '0' : '1',
          transition: 'all 0.3s',
          visibility: !selectedThread.isSelected ? 'hidden' : 'visible'
        }}
        src="https://cdn-icons-png.flaticon.com/512/130/130882.png"
        alt="<"
        onClick={deleteSelectionThread}
      />
      <p
        className="messagearea__top-headText"
        style={{
          transition: 'all 0.3s'
        }}
      >
        {selectedThread.choosedThread
          ? selectedThread.choosedThread.name
          : 'Messenger'}
      </p>
      <img
        style={{
          opacity: !selectedThread.isSelected ? '0' : '1',
          transition: 'all 0.3s',
          visibility: !selectedThread.isSelected ? 'hidden' : 'visible'
        }}
        src="https://cdn-icons-png.flaticon.com/512/512/512142.png"
        alt="..."
        onClick={() => setModalShown((prev) => !prev)}
      />
      <ModalMoreActions
        isModalShown={isModalShown}
        setModalShown={setModalShown}
      />
    </div>
  )
}
