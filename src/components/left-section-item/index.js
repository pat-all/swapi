import React from 'react'
import { NavLink } from 'react-router-dom'

import './index.scss'

const LeftSectionItem = ({ title, to }) => {
  return (
    <div className="left-section-item">
      <NavLink to={to} activeClassName="selected-left">
        <h5>{title}</h5>
      </NavLink>
    </div>
  )
}

export default LeftSectionItem
