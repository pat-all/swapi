import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import "./index.scss";

import LeftSectionItem from "../../components/left-section-item";

import { ITEMS_ON_PAGE, notFoundTypes } from "../../assests/config/constants";

import { setNotFoundError } from "../../redux-stuff/reducers/error-slice";
import {
  setActivePage,
  requestPage,
  searchRequest
} from "../../redux-stuff/reducers/category-slice";
import {
  getPageFromSearch,
  pageExpTest,
  getFirstValue,
  cutUrl,
  getSearchQuery
} from "../../assests/config/swapi.config";
import Pagination from "../pagination";

const LeftSection = () => {
  const { category: categoryName } = useParams();
  const { pathname, search } = useLocation();
  const page =
    `/${categoryName}/` === pathname ? getPageFromSearch(search) : undefined;
  const searchQuery =
    `/${categoryName}/` === pathname &&
    getSearchQuery(search) &&
    getSearchQuery(search).trim().length > 0
      ? getSearchQuery(search).trim()
      : null;
  const { entities, isFetching } = useSelector(state => state.categories);
  const { connectionError, notFoundError } = useSelector(state => state.errors);
  const category = entities[categoryName];
  const activePage = category ? category.activePage : 1;
  const categoriesNames = Object.keys(entities);
  const entitiesCount = categoriesNames.length;
  const dispatch = useDispatch();
  const totalCount = category ? (category.count ? category.count : 0) : 0;
  const pagesCount = totalCount ? Math.ceil(totalCount / ITEMS_ON_PAGE) : 0;
  let items = [];
  let currentCount = 0;

  useEffect(() => {
    if (entitiesCount > 0 && !connectionError.isError) {
      if (categoriesNames.includes(categoryName)) {
        if (notFoundError.isError)
          dispatch(
            setNotFoundError({ isError: false, type: undefined, log: "" })
          );
        if (!searchQuery && category.pages && !category.pages[activePage]) {
          dispatch(requestPage({ category: categoryName, page: activePage }));
        } else if (searchQuery && category.search.query !== searchQuery) {
          dispatch(
            searchRequest({ category: categoryName, search: searchQuery })
          );
        }
      } else
        dispatch(
          setNotFoundError({
            isError: true,
            type: notFoundTypes.category,
            log: categoryName
          })
        );
    }
  });
  useEffect(() => {
    if (
      !isFetching &&
      !connectionError.isError &&
      category &&
      pageExpTest(search) &&
      !searchQuery &&
      page
    ) {
      dispatch(setActivePage({ category: categoryName, page }));
    }
  });

  if (
    category &&
    category.pages &&
    category.pages[activePage] &&
    !searchQuery
  ) {
    items = category.pages[activePage];
    currentCount = items.length;
  } else if (
    category &&
    category.search &&
    searchQuery &&
    category.search.query === searchQuery
  ) {
    items = category.search.results;
  }
  return (
    <section className="left-section">
      {items.map((item, i) => {
        return (
          <LeftSectionItem
            key={i}
            title={getFirstValue(item)}
            to={cutUrl(item.url)}
          />
        );
      })}
      {!searchQuery && pagesCount > 1 && (
        <Pagination page={activePage} pagesCount={pagesCount} />
      )}
      {!searchQuery && currentCount > 0 && (
        <div className="legend">
          {`${(activePage - 1) * ITEMS_ON_PAGE + 1} - ${(activePage - 1) *
            ITEMS_ON_PAGE +
            currentCount} of ${totalCount}`}
        </div>
      )}
    </section>
  );
};

export default LeftSection;
