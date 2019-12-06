import { createSlice } from 'redux-starter-kit'

const featuresSlice = createSlice({
  slice: 'features',
  initialState: { isBurgerActive: false },
  reducers: {
    setBurgerActive(state, action){
      const { isActive } = action.payload
      state.isBurgerActive = isActive
    }
  }
})

export const { setBurgerActive } = featuresSlice.actions

export default featuresSlice.reducer