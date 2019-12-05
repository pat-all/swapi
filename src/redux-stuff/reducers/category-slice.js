import { createSlice } from "redux-starter-kit";

import {searchInCategory} from "../../assests/config/swapi.config"

const categorySlice = createSlice({
  slice: "categories",
  initialState: { isFetching: false, entities: {} },
  reducers: {
    requestAll(state) {
      state.isFetching = true;
    },
    receiveAll(state, action) {
      state.isFetching = false;
      const categoriesNames = Object.keys(action.payload);
      categoriesNames.map(
        name => (state.entities[name] = { count: 0, activePage: 1, pages: [], search:{query: "", results: []} })
      );
    },
    requestPage(state, action) {},
    receivePage(state, action) {
      const { category, json, page } = action.payload;
      const { count, results } = json;
      state.entities[category].count = count;
      state.entities[category].pages[page] = results;
    },
    setActivePage(state, action) {
      const { category, page } = action.payload;
      state.entities[category].activePage = Number(page);
    },
    requestItem(state, action) {},
    receiveItem(state, action) {
      const { category, json } = action.payload;
      if (state.entities[category].pages[0]) {
        state.entities[category].pages[0].push(json.results[0]);
      } else {
        state.entities[category].pages[0] = [json.results[0]];
      }
    },
    cancelFetching(state) {
      state.isFetching = false;
    },
    searchRequest(state, action){},
    receiveSearchData(state, action){
      const {category, query, json} = action.payload
      const searchResults = json.results
      const pages = state.entities[category].pages
      state.entities[category].search = {query, results: searchResults}

      searchResults.forEach(item => {
        if(searchInCategory(state.entities[category], {fieldName: "url", fieldValue: item.url}).length === 0){
          if(pages[0]){
            pages[0].push(item)
          } else {
            pages[0] = [item]
          }
        }
      })
      
      
    }
  }
});

export const {
  requestAll,
  receiveAll,
  requestItem,
  receiveItem,
  setActivePage,
  requestPage,
  receivePage,
  fetchDataFail,
  cancelFetching,
  searchRequest,
  receiveSearchData,
} = categorySlice.actions;

export default categorySlice.reducer;
