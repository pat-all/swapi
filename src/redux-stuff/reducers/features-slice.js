import { createSlice } from 'redux-starter-kit'

const featuresSlice = createSlice({
  slice: 'features',
  initialState: { isBurgerActive: false, isLeftSectionActive: false },
  reducers: {
    setBurgerActive(state, action){
      const isActive  = action.payload
      state.isBurgerActive = isActive
    },
    setLeftSectionActive(state, action){
      const isActive = action.payload
      state.isLeftSectionActive = isActive
    }
  }
})

export const { setBurgerActive, setLeftSectionActive } = featuresSlice.actions

export default featuresSlice.reducer