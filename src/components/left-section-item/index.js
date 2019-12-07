import React from 'react'
import { NavLink } from 'react-router-dom'

import './index.scss'

const LeftSectionItem = ({ title, to, toggleActive}) => {
  return (
    <div className="left-section-item" onClick={toggleActive}>
      <NavLink to={to} activeClassName="selected-left">
        <h5>{title}</h5>
      </NavLink>
    </div>
  )
}

export default LeftSectionItem
