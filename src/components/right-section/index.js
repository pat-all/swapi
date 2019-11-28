import React, { useEffect, useState } from 'react'
import { useParams, Link, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {fetchCategoryItemIfNeeded} from '../../assests/config/data-fetch-service'

import {
  lowDashReplacer,
  changeUrl,
  searchInCategory,
  replaceUrl,
} from '../../assests/config/swapi.config'

import './index.scss'

const RightSection = () => {
  const { url } = useRouteMatch()
  //const [item, setItem] = useState(null)
  const dispatch = useDispatch()
  const { category: categoryName, id } = useParams()
  const { entities, isFetching } = useSelector(state => state.categories)
  const connectionError  = useSelector(state => state.errors.connectionError.isError)
  const category = entities[categoryName]

  let itemKeys = []
  let item = null

  useEffect(() => {
    if (!isFetching && !connectionError && id && category && !item) {
      dispatch(fetchCategoryItemIfNeeded(category, categoryName, url))
    }
  })

  if(!isFetching && category && url && !item) {
    item = searchInCategory(category, {fieldName: 'url', fieldValue: url})
    console.log(item)
    itemKeys = item ? Object.keys(item) : []
  }
  return (
    <section className="right-section">
      <div className="data-container">
        {item && itemKeys.length > 0 &&
          itemKeys.map((key, i) => {
            const style =
              i % 2 === 0
                ? { background: '#efebe9' }
                : { background: 'transparent' }
            return (
              <div className="row" key={i} style={style}>
                <div className="left-cell">{lowDashReplacer(key)}</div>
                {Array.isArray(item[key]) ? (
                  item[key].map((data, i) => (
                    <div className="right-cell" key={i}>
                      {changeUrl(data) ? (
                        <Link to={changeUrl(data)}>
                          {replaceUrl(entities, data)
                            ? replaceUrl(entities, data)
                            : changeUrl(data)}
                        </Link>
                      ) : (
                        data
                      )}
                    </div>
                  ))
                ) : (
                  <div className="right-cell">
                    {changeUrl(item[key]) ? (
                      <Link to={changeUrl(item[key])}>
                        {changeUrl(item[key])}
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
