import React from 'react'
import { useSelector } from 'react-redux'

import './index.scss'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

//components
import Header from '../header'
import Home from '../../components/home'
import Category from '../category'
import Portal from '../portal'
import Loader from '../../components/loader'
import ErrorPage from '../error-page'

const App = () => {
  const categories = useSelector(state => state.categories)
  const { notFoundError, connectionError } = useSelector(state => state.errors)
  const { isFetching } = categories

  return (
    <div className="App">
      <Router>
        <Header />
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
    </div>
  )
}

export default App
