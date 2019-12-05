import { all } from 'redux-saga/effects'

import { watchReqAll, watchReqPage, watchSearch, watchReqItem } from './category-saga'

export default function* rootSaga() {
  yield all([
    watchReqAll(),
    watchReqPage(),
    watchSearch(),
    watchReqItem(),
  ])
}