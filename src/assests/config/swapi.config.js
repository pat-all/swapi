import { SWAPI_BASE_URL, ITEMS_ON_PAGE, regExps } from "./constants";

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
    : categories[categoryName].pages[page]
    ? categories[categoryName].pages[page][id]
    : null;
  return item ? getFirstValue(item) : null;
};

const findItemBySearchData = (arr, searchData) =>
  arr.find(el => changeUrl(el[searchData.fieldName]) === searchData.value);

export const searchInCategory = (category = {}, searchDataList = []) => {
  const { pages } = category;
  const result = [];
  if (pages) {
    for (let i = 0; i < searchDataList.length; i++) {
      for (let j = 0; j < pages.length; j++) {
        const searchData = searchDataList[i];
        const page = pages[j];
        if (page && searchData) {
          const item = findItemBySearchData(page, searchData);
          if (item) result.push(item);
        }
      }
    }
    return result.length > 0 ? result : null;
  }
};
