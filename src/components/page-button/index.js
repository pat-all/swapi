import React from 'react'
import {Link} from 'react-router-dom'

import './index.scss'

import {replaceDubleSlash} from "../../assests/config/swapi.config"

const PageButton = ({ children, to, clickHandler }) => {
  return (
    <button className="page-button" onClick={clickHandler}>
      {to ? (<Link to={replaceDubleSlash(to)}>{children}</Link>) : children}
    </button>
  )
}

export default PageButton
