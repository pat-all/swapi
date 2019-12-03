import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//styles
import './index.scss'

//components
import Search from '../search'

import { fetchCategoriesNamesIfNeeded } from '../../assests/config/data-fetch-service'

const Header = () => {
  const categories = useSelector(state => state.categories)
  const connectionError = useSelector(state => state.errors.connectionError.isError)
  const categoriesNames = Object.keys(categories.entities)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!connectionError) dispatch(fetchCategoriesNamesIfNeeded(categories))
  })
  return (
    <header>
      <div className="header-section">
        <div className="header-logo header-item">SWAPI</div>
        <div className="header-item nav-top">
          <NavLink exact to="/" activeClassName="selected">
            home
          </NavLink>
        </div>

        {categoriesNames.map(name => (
          <div key={name} className="header-item nav-top">
            <NavLink to={`/${name}`} activeClassName="selected">
              {name}
            </NavLink>
          </div>
        ))}
      </div>
      <div className="header-section">
        <Search />
      </div>
    </header>
  )
}

export default React.memo(Header)
