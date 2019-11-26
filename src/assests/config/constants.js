export const SWAPI_BASE_URL = 'http://cors-anywhere.herokuapp.com/https://swapi.co/api'
//export const SWAPI_BASE_URL = 'http://localhost:3030/api'

export const ITEMS_ON_PAGE = 10

const STRING_EXP = /[a-z]+/
const NUMBER_EXP = /[0-9]+/
const PAGE_EXP = /\?page=[0-9]+/

export const regExps = {
  string: STRING_EXP,
  number: NUMBER_EXP,
  page: PAGE_EXP
}

const CATEGORY = 'CATEGORY'
const PAGE = 'PAGE'
export const notFoundTypes = {
  category: CATEGORY,
  page: PAGE
}