import { put, call, takeEvery } from "redux-saga/effects";
import fetch from "cross-fetch";
import { urlBuilder } from "../../assests/config/swapi.config";

import {
  requestAll,
  receiveAll,
  requestItem,
  receiveItem,
  cancelFetching,
  requestPage,
  receivePage,
  searchRequest,
  receiveSearchData,
} from "../reducers/category-slice";
import { setConnectionError } from "../reducers/error-slice";

function* reqAllCategoryNames() {
  try {
    const categories = yield call(fetch, urlBuilder());
    const names = yield categories.json().then(res => res);
    yield put(receiveAll(names));
  } catch (err) {
    yield put(cancelFetching());
    yield put(setConnectionError({ isError: true, log: err.message }));
  }
}

export function* watchReqAll(){
  yield takeEvery(requestAll.toString(), reqAllCategoryNames);
}

function* reqPage({payload}){
  const {category, page} = payload
  try {
    const results = yield call(fetch, urlBuilder({category, page}))
    const json = yield results.json().then(res => res);
    yield put(receivePage({category, page, json}))
  } catch(err) {
    yield put(cancelFetching());
    yield put(setConnectionError({ isError: true, log: err.message }));
  }
}

export function* watchReqPage() {
  yield takeEvery(requestPage.toString(), reqPage)
}

function* makeSearch({payload}){
  const {category, search} = payload
  try{
    const results = yield call(fetch, urlBuilder({category, search}))
    const json = yield results.json().then(res => res);
    yield put(receiveSearchData({category, query: search, json}))
  } catch(err) {
    yield put(cancelFetching());
    yield put(setConnectionError({ isError: true, log: err.message }));
  }
}

export function* watchSearch(){
  yield takeEvery(searchRequest.toString(), makeSearch)
}

function* fetchItem({payload}){
  const {category, url} = payload
  try{
    const results = yield call(fetch, urlBuilder({category, url}))
    const json = yield results.json().then(res => res);
    yield put(receiveItem({category, json}))
  } catch(err){
    yield put(cancelFetching());
    yield put(setConnectionError({ isError: true, log: err.message }));
  }
}

export function* watchReqItem(){
  yield takeEvery(requestItem.toString(), fetchItem)
}
