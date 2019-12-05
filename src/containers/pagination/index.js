import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'

import './index.scss'

import PageButton from '../../components/page-button'
import PageButtonsContainer from '../page-buttons-container'

const Pagination = ({ page, pagesCount }) => {
  const showLeftStep = page > 1
  const showLeftDots = page > 2
  const showRightStep = page < pagesCount
  const showRightDots = pagesCount - page > 1
  const [prevPages, setPrevPages] = useState([])
  const [nextPages, setNextPages] = useState([])
  const [isShownPrevPages, togglePrevPages] = useState(false)
  const [isShownNextPages, toggleNextPages] = useState(false)

  const { url } = useRouteMatch()

  const pagesRange = function* (start, end){
    while(start < end){
      yield start++
    }
  }

  const leftDotsClickHandler = () => {
    const newPages = pagesRange(1, page)

    setPrevPages([...newPages])
    togglePrevPages(!isShownPrevPages)
    toggleNextPages(false)
  }
  const rightDotsClickHandler = () => {
    const newPages = pagesRange(page + 1, pagesCount + 1)
    
    setNextPages([...newPages])
    toggleNextPages(!isShownNextPages)
    togglePrevPages(false)
  }

  const hidePageButtons = () => {
    toggleNextPages(false)
    togglePrevPages(false)
  }

  return (
    <div className="pagination">
      {prevPages.length > 0 && isShownPrevPages && (
        <PageButtonsContainer nums={prevPages} clicHandler={hidePageButtons}/>
      )}
      {nextPages.length > 0 && isShownNextPages && (
        <PageButtonsContainer nums={nextPages} clicHandler={hidePageButtons}/>
      )}
      <ul>
        {showLeftStep && (
          <li onClick={hidePageButtons}>
            <PageButton to={`${url}/?page=${page - 1}`}>{'<'}</PageButton>
          </li>
        )}
        {showLeftDots && (
          <li onClick={leftDotsClickHandler}>
            <PageButton>{'...'}</PageButton>
          </li>
        )}
        <li onClick={hidePageButtons}>
          <PageButton>{page}</PageButton>
        </li>
        {showRightDots && (
          <li onClick={rightDotsClickHandler}>
            <PageButton>{'...'}</PageButton>
          </li>
        )}
        {showRightStep && (
          <li onClick={hidePageButtons}>
            <PageButton to={`${url}/?page=${page + 1}`}>{'>'}</PageButton>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Pagination
