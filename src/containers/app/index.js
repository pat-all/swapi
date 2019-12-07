import React from 'react'
import { useSelector } from 'react-redux'

import './index.scss'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import useLeftActive from '../../assests/hooks/useLeftActive'

//components
import Header from '../header'
import Home from '../../components/home'
import Category from '../category'
import Portal from '../portal'
import Loader from '../../components/loader'
import ErrorPage from '../error-page'
import SmallNav from '../small-nav'
import LeftButton from '../../components/left-section-button'

const App = () => {
  const categories = useSelector(state => state.categories)
  const { notFoundError, connectionError } = useSelector(state => state.errors)
  const { isFetching } = categories
  const isBurgerActive = useSelector(state => state.features.isBurgerActive)
  const isLeftActive = useSelector(state => state.features.isLeftSectionActive)
  const setActive = useLeftActive()
  
  const toggleActive = () => {
    setActive(!isLeftActive)
  }

  return (
    <div className="App">
      <Router>
        <Header />
        {isBurgerActive && <SmallNav />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:category">
            {notFoundError.isError ? <ErrorPage /> : <Category />}
          </Route>
        </Switch>
      </Router>
      {isFetching && !connectionError.isError && (
        <Portal id="modal-root">
          <Loader />
        </Portal>
      )}
      {connectionError.isError && (
        <Portal id="modal-root">
          <ErrorPage />
        </Portal>
      )}
      <LeftButton isActive={isLeftActive} toggleActive={toggleActive}/>
    </div>
  )
}

export default App
