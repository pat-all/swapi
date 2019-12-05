import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/app';
import * as serviceWorker from './serviceWorker';

import { configureStore } from "redux-starter-kit";
import createSagaMiddleware from 'redux-saga'
import { Provider } from "react-redux";
import rootReducer from "./redux-stuff/reducers";

import rootSaga from "./redux-stuff/sagas"

const sagaMiddleWare = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleWare]
});

sagaMiddleWare.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


