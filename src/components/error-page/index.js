import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './index.scss'

const ErrorPage = () => {
  const categories = useSelector(state => Object.keys(state.categories.entities))
  const {connectionError, notFoundError} = useSelector(state => state.errors)
  const classNames = connectionError.isError ? '.error-page .error-modal' : '.error-page'
 
  return (
    <div className={classNames}>
      {connectionError.isError && (<h2>{connectionError.log}</h2>)}
      {!connectionError.isError && notFoundError.isError && (
        <React.Fragment>
        <h3>{`Error: ${notFoundError.log} is NOT FOUND, try:`}</h3>
        <ul>
          {categories.map((category, i) => (
            <li key={i}><Link to={`/${category}/`}>{`/${category}/`}</Link></li>
          ))}
        </ul>
        </React.Fragment>
      )}
    </div>
  )
}

export default ErrorPage