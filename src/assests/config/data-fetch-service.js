import fetch from "cross-fetch";

import { urlBuilder, filterParams, searchInCategory } from "./swapi.config";

import { setConnectionError } from "../../redux-stuff/reducers/error-slice";

import {
  requestAll,
  receiveAll,
  requestItem,
  receiveItem,
  requestPage,
  receivePage,
  cancelFetching
} from "../../redux-stuff/reducers/category-slice";

const headers = {
  "Access-Control-Allow-Origin": "http://localhost:3000/",
  "Access-Control-Allow-Methods": "GET, POST, PUT",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};

const fetchCategoriesNames = () => {
  return dispatch => {
    dispatch(requestAll());
    return fetch(urlBuilder(), {headers})
      .then(response => response.json())
      .then(json => dispatch(receiveAll(json)))
      .catch(err => {
        console.log(err);
        dispatch(cancelFetching());
        dispatch(setConnectionError({ isError: true, log: err.message }));
        //TODO connection error
      });
  };
};

const shouldFetchCategoriesNames = state => {
  const { entities, isFetching } = state;
  const categoriesNamesCount = Object.keys(entities).length;

  if (0 === categoriesNamesCount && isFetching) return false;
  else if (0 === categoriesNamesCount && !isFetching) return true;
  else return false;
};

export const fetchCategoriesNamesIfNeeded = state => {
  return dispatch => {
    if (shouldFetchCategoriesNames(state)) dispatch(fetchCategoriesNames());
  };
};

const fetchCategoryPage = ({ category, page }) => {
  return dispatch => {
    dispatch(requestPage({ category, page }));
    return fetch(urlBuilder({ category, page }, {headers}))
      .then(response => response.json())
      .then(json => dispatch(receivePage({ category, json, page })))
      .catch(err => {
        console.log(err);
        dispatch(cancelFetching());
        dispatch(setConnectionError({ isError: true, log: err.message }));
        //TODO connection error
      });
  };
};

const shouldFetchCategoryPage = (category, page) => {
  const { pages } = category;
  if (pages[page] && pages[page].length > 0) return false;
  else return true;
};
export const fetchCategoryPageIfNeeded = (
  category,
  { category: categoryName, page }
) => {
  return dispatch => {
    if (shouldFetchCategoryPage(category, page))
      dispatch(
        fetchCategoryPage({
          category: filterParams({ string: categoryName }),
          page: filterParams({ number: page })
        })
      );
  };
};

const fetchCategoryItem = ({ category, url }) => {
  return dispatch => {
    dispatch(requestItem({ url }));
    return fetch(urlBuilder({ url }, {headers}))
      .then(response => response.json())
      .then(json => dispatch(receiveItem({ category, json })))
      .catch(err => {
        console.log(err);
        dispatch(cancelFetching());
        dispatch(setConnectionError({ isError: true, log: err.message }));
        //TODO connection error
      });
  };
};

export const fetchCategoryItemIfNeeded = (category, categoryName, url) => {
  return dispatch => {
    if (!searchInCategory(category, url)) {
      dispatch(fetchCategoryItem({ category: categoryName, url }));
    }
  };
};
