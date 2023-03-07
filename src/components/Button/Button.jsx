import React from 'react'
import './Button.styles.scss'

export const Button = ({ onClick, text }) => {
  return (
    <div className="neumorph__button" onClick={onClick}>
      <p>{text}</p>
    </div>
  )
}
