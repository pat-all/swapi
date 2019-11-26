import { createSlice } from 'redux-starter-kit'

const categorySlice = createSlice({
  slice: 'categories',
  initialState: { isFetching: false, entities: {} },
  reducers: {
    requestAll(state) {
      state.isFetching = true
    },
    receiveAll(state, action) {
      state.isFetching = false
      const categoriesNames = Object.keys(action.payload)
      categoriesNames.map(
        name => (state.entities[name] = { count: 0, activePage: 1, pages: [] })
      )
    },
    requestPage(state, action) {},
    receivePage(state, action) {
      const { category, json, page } = action.payload
      const { count, results } = json
      state.entities[category].count = count
      state.entities[category].pages[page] = results
    },
    setActivePage(state, action) {
      const { category, page } = action.payload
      state.entities[category].activePage = Number(page)
    },
    requestItem(state, action) {},
    receiveItem(state, action) {
      const { category, json } = action.payload
      state.entities[category].pages[0].push(json)
    },
    cancelFetching(state){
      state.isFetching = false
    }
  }
})

export const {
  requestAll,
  receiveAll,
  requestItem,
  receiveItem,
  setActivePage,
  requestPage,
  receivePage,
  fetchDataFail,
  cancelFetching
} = categorySlice.actions

export default categorySlice.reducer
