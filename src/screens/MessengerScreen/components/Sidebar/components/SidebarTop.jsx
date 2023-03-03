import React from 'react'

export const SidebarTop = ({ user, handleAddThread }) => {

  return (
    <div className="sidebar__top">
      <div className="user-info">
        <img src={user.photo} alt="user" />
        <p>{user.displayName}</p>
      </div>
      <input type="text" placeholder="Find dialog" />
      <button onClick={handleAddThread}>create dialog</button>
    </div>
  )
}
