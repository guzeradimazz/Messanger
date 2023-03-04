import React from 'react'
import './Thread.styles.scss'

export const Thread = ({ name, date, onClick }) => {
  const parseDate = (seconds) => {
    const now = new Date()
    const temp = new Date(seconds * 1000)

    const hours = temp.getHours()
    const minutes = temp.getMinutes()
    return `${hours}:${minutes}`
  }

  return (
    <div className="threads__item" onClick={onClick}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="avatar"
      />
      <h3>{name}</h3>
      <small>{parseDate(date)}</small>
    </div>
  )
}
