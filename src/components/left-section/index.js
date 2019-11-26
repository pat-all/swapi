import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'

import './index.scss'

import LeftSectionItem from '../left-section-item'

import { fetchCategoryPageIfNeeded } from '../../assests/config/data-fetch-service'

import { ITEMS_ON_PAGE, notFoundTypes } from '../../assests/config/constants'

import { setNotFoundError } from '../../redux-stuff/reducers/error-slice'
import { setActivePage } from '../../redux-stuff/reducers/category-slice'
import {
  getPageFromSearch,
  pageExpTest,
  getFirstValue,
  changeUrl,
} from '../../assests/config/swapi.config'
import Pagination from '../pagination'

const LeftSection = () => {
  const { category: categoryName } = useParams()
  const searchStr = useLocation().search
  const page = getPageFromSearch(searchStr)
  const { entities, isFetching } = useSelector(state => state.categories)
  const {connectionError, notFoundError } = useSelector(state => state.errors)
  const category = entities[categoryName]
  const activePage = category ? category.activePage : 1
  const categoriesNames = Object.keys(entities)
  const entitiesCount = categoriesNames.length
  const dispatch = useDispatch()
  const totalCount = category ? (category.count ? category.count : 0) : 0
  const pagesCount = totalCount ? Math.ceil(totalCount / ITEMS_ON_PAGE) : 0
  let items = []
  let currentCount = 0

  useEffect(() => {
    if (entitiesCount > 0 && !connectionError.isError) {
      if(categoriesNames.includes(categoryName)) {
        if(notFoundError.isError) dispatch(setNotFoundError({isError: false, type: undefined, log: ""}))
        dispatch(
          fetchCategoryPageIfNeeded(category, {
            category: categoryName,
            page: activePage
          }))
      } else dispatch(setNotFoundError({isError: true, type: notFoundTypes.category, log: categoryName}))
    }
  })
  useEffect(() => {
    if (!isFetching && !connectionError && category && pageExpTest(searchStr)) {
      dispatch(setActivePage({category: categoryName, page}))
    }
  })

  if (category && category.pages && category.pages[activePage]) {
    items = category.pages[activePage]
    currentCount = items.length
  }
  return (
    <section className="left-section">
      {items.map((item, i) => {
        return <LeftSectionItem key={i} title={getFirstValue(item)} to={changeUrl(item.url)} />
      })}
      {pagesCount > 1 && <Pagination page={activePage} pagesCount={pagesCount} />}
      {currentCount > 0 && (
        <div className="legend">
          {`${(activePage - 1) * ITEMS_ON_PAGE + 1} - ${(activePage - 1) * ITEMS_ON_PAGE +
            currentCount} of ${totalCount}`}
        </div>
      )}
    </section>
  )
}

export default LeftSection
