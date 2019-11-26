import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import './index.scss'

import RightSection from '../right-section'
import LeftSection from '../left-section'

const Category = () => {
  const { path } = useRouteMatch()

  return (
    <section className="category-section">
      <LeftSection />
      <Switch>
        <Route exact path={path}>
          Select item from left part
        </Route>
        <Route path={`${path}/:id`} component={RightSection} />
      </Switch>
    </section>
  )
}

export default React.memo(Category)