import React from 'react'
import { Button } from '../../../../../components/Button/Button'

export const SidebarTop = ({
  user,
  setModalShow,
  searchInput,
  setSearchInput
}) => {
  return (
    <div className="sidebar__top">
      <div className="user-info">
        <img src={user.photo} alt="user" />
        <p>{user.displayName}</p>
      </div>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
        placeholder="Search"
      />
      <Button
        onClick={() => setModalShow((prev) => !prev)}
        text={'create dialog'}
      />
    </div>
  )
}
