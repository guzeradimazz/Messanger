import React from 'react'
import './Modal.styles.scss'

export const Modal = ({
  handleAddThread,
  setModalShow,
  threadName,
  setThreadName
}) => {
  return (
    <div className="modal">
      <div className="modal__container">
        <img
          onClick={() => setModalShow((prev) => !prev)}
          className="modal__container-close"
          src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
          alt="close"
        />
        <input
          value={threadName}
          onChange={(e) => setThreadName(e.target.value)}
          type="text"
          placeholder="Type name of your thread"
        />
        <button onClick={handleAddThread}>create thread!</button>
      </div>
    </div>
  )
}
