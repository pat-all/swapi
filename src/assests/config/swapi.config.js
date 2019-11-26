import { SWAPI_BASE_URL, ITEMS_ON_PAGE, regExps, SEARCH_FIELDS } from "./constants";

export const pageExpTest = str => regExps.page.test(str);

export const calcId = (page, i) => (page - 1) * ITEMS_ON_PAGE + i + 1;

export const calcIdFromUrl = id =>
  id % ITEMS_ON_PAGE === 0 ? ITEMS_ON_PAGE - 1 : (id % ITEMS_ON_PAGE) - 1;

export const calcPage = id => Math.ceil(id / ITEMS_ON_PAGE);

export const getFirstValue = item => {
  const keys = Object.keys(item);
  return item[keys[0]];
};

export const urlBuilder = (set = {}) => {
  const { category, page, search, url } = set;
  if (category && !page && !search) return `${SWAPI_BASE_URL}/${category}`;
  else if (category && page > 0 && !search)
    return `${SWAPI_BASE_URL}/${category}/?page=${page}`;
  else if (category && !page && search)
    return `${SWAPI_BASE_URL}/${category}/?search=${search}`;
  else if (url && !category && !page && !search)
    return `${SWAPI_BASE_URL}${url}`;
  else return SWAPI_BASE_URL;
};

export const filterParams = (set = {}) => {
  const { string, number } = set;
  return string
    ? string.match(regExps.string)[0]
    : number
    ? typeof number === "number"
      ? number
      : number.match(regExps.number)[0]
    : null;
};

export const searchFields = ["name", "title", "model"];

export const getPageFromSearch = searchStr => {
  if (pageExpTest(searchStr)) {
    return searchStr.match(regExps.number)[0];
  } else return 1;
};

export const lowDashReplacer = str => str.replace(/_/g, " ");

export const changeUrl = str =>
  /https/.test(str) ? str.replace("https://swapi.co/api", "") : null;

export const replaceUrl = (categories, url) => {
  const myUrl = changeUrl(url);
  const categoryName = filterParams({ string: myUrl });
  const urlId = filterParams({ number: myUrl });
  const page = calcPage(urlId);
  const id = calcIdFromUrl(urlId);
  const item = categories[categoryName]
    ? categories[categoryName].pages
    ? categories[categoryName].pages[page]
    ? categories[categoryName].pages[page][id]
    : null
    : null 
    : null;
  return item ? getFirstValue(item) : null;
};

const findItemBySearchData = (arr, searchData) =>
  arr.find(el => changeUrl(el[searchData.fieldName]) === searchData.value);

export const searchInCategory = (category = {}, searchData = {}) => {
  const { pages } = category;
  const { fieldName, fieldvalue } = searchData
  const reqExp = /[0-9]$/
  let result = null
  if(pages && fieldName && fieldvalue){
    fieldName =  fieldName === 'url' ? reqExp.test(fieldName) ? fieldName + "/" : fieldName : fieldName
    pages.forEach(page => {
      page.forEach(item => {
        if(changeUrl(item.url) === url) result = item
      })
    })
  }
  return result
};

const searchData = (set = {}) => {
  const { categories, category, query } = set
  const result = []
  if(categories && categories[category] && query){
    SEARCH_FIELDS.forEach(field => {
      const iterResult = searchInCategory(categories[category], {field: query})
      if(iterResult) result.push(iterResult)
    })
  }
  return result
}
