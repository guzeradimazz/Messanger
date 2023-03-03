import React from 'react'
import './Thread.styles.scss'

export const Thread = ({name}) => {
  return (
    <div className='threads__item'>
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="avatar"
      />
      <h3>{name}</h3>
      <small>20:00</small>
    </div>
  )
}
