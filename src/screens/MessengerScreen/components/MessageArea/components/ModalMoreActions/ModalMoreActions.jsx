import './ModalMoreActions.styles.scss'
import React from 'react'

export const ModalMoreActions = ({ isModalShown, setModalShown }) => {
  return (
    <div
      className="modal-moreactions"
      style={{
        opacity: isModalShown ? '1' : '0',
        visibility: isModalShown ? 'visible' : 'hidden',
        transform: `translateX(${isModalShown ? '0%' : '200%'})`
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
        alt="x"
        className="close"
        onClick={() => setModalShown((prev) => !prev)}
      />
      <ul>
        <li>delete thread</li>
        <li>delete thread</li>
        <li>delete thread</li>
      </ul>
    </div>
  )
}
