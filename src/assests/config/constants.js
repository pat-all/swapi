export const SWAPI_BASE_URL = 'https://swapi.co/api'
const CORS_BREAK = 'http://cors-anywhere.herokuapp.com/'
export const API_BASE = CORS_BREAK + SWAPI_BASE_URL

export const ITEMS_ON_PAGE = 10

export const regExps = {
  string: /[a-z]+/,
  number: /[0-9]+/,
  page: /\?page=[0-9]+/
}

export const notFoundTypes = {
  category: 'CATEGORY',
  page: 'PAGE'
}

export const SEARCH_FIELDS = [
  "name", "title", "model"
]