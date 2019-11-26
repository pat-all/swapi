import React from 'react'
import {Link} from 'react-router-dom'

import './index.scss'

const PageButton = ({ children, to, clickHandler}) => {
  return (
    <button className="page-button" onClick={clickHandler}>
      {to ? (<Link to={to}>{children}</Link>) : children}
    </button>
  )
}

export default PageButton
