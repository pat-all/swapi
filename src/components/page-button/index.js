import React from 'react'
import {Link} from 'react-router-dom'

import './index.scss'

import {replaceDubleSlash} from "../../assests/config/swapi.config"

const PageButton = ({ children, to, clickHandler, style }) => {
  console.log(style)
  return (
    <button className="page-button" onClick={clickHandler} style={style}>
      {to ? (<Link to={replaceDubleSlash(to)}>{children}</Link>) : children}
    </button>
  )
}

export default PageButton
