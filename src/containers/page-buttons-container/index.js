import React from 'react'
import {useRouteMatch} from 'react-router-dom'

import PageButton from '../../components/page-button'

import './index.scss'

const PageButtonsContainer = ({ nums, clicHandler }) => {
  const columns = 4
  const templateColumns = nums.length >= columns ? columns : nums.length
  const gridSettings = (num, columns)=> {
    const row = Math.floor(num / (columns + 1)) + 1
    const column = num % (columns ) === 0 ? columns : num % (columns)
    return {
      "gridColumn": `${column} / ${column + 1}`,
      "gridRow": `${row} / ${row + 1}`
    }
  }
  const { url } = useRouteMatch()
  return (
    <div className="page-buttons-container" style={{"gridTemplateColumns": `repeat(${templateColumns}, 39px)`}}>
      {nums.map((num, i) => {
        return (
            <PageButton key={num} to={`${url}/?page=${num}`} clickHandler={clicHandler} style={gridSettings(i + 1, columns)}>
              {num}
            </PageButton>
        )
      })}
    </div>
  )
}

export default PageButtonsContainer