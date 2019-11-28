import React, { useEffect } from 'react'
import { useParams, Link, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {fetchCategoryItemIfNeeded} from '../../assests/config/data-fetch-service'

import {
  lowDashReplacer,
  cutUrl,
  searchInCategory,
  replaceUrl,
} from '../../assests/config/swapi.config'

import './index.scss'

const RightSection = () => {
  const { url } = useRouteMatch()
  const dispatch = useDispatch()
  const { category: categoryName, id } = useParams()
  const { entities, isFetching } = useSelector(state => state.categories)
  const {connectionError}  = useSelector(state => state.errors)
  const category = entities[categoryName]

  let itemKeys = []
  let items = []
  let item = null

  useEffect(() => {
    if (!isFetching && !connectionError.isError && id && category && !item) {
      dispatch(fetchCategoryItemIfNeeded(category, categoryName, url))
    }
  })

  if(!isFetching && category && url && !item) {
    items = searchInCategory(category, {fieldName: 'url', fieldValue: url})
    item = items.length > 0 ? items[0] : null
    itemKeys = item ? Object.keys(item) : []
  }
  return (
    <section className="right-section">
      <div className="data-container">
        {item && itemKeys.length > 0 &&
          itemKeys.map((key, i) => {
            const style = {background: i % 2 === 0 ? '#efebe9' : 'transparent'}
            return (
              <div className="row" key={i} style={style}>
                <div className="left-cell">{lowDashReplacer(key)}</div>
                {Array.isArray(item[key]) ? (
                  item[key].map((data, i) => (
                    <div className="right-cell" key={i}>
                      {cutUrl(data) ? (
                        <Link to={cutUrl(data)}>
                          {replaceUrl(entities, data)
                            ? replaceUrl(entities, data)
                            : cutUrl(data)}
                        </Link>
                      ) : (
                        data
                      )}
                    </div>
                  ))
                ) : (
                  <div className="right-cell">
                    {cutUrl(item[key]) ? (
                      <Link to={cutUrl(item[key])}>
                        {cutUrl(item[key])}
                      </Link>
                    ) : (
                      item[key]
                    )}
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default RightSection
