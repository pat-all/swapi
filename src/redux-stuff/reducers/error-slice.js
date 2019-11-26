import { createSlice } from 'redux-starter-kit'

const errorSlice = createSlice({
  slice: "errors",
  initialState: { connectionError: {isError: false, log: ""}, notFoundError: {isError: false, type: undefined, log: ""} },
  reducers: {
    setConnectionError(state, action){
      const { isError, log } = action.payload
      state.connectionError = { isError, log }
    },
    setNotFoundError(state, action){
      const { isError, log, type } = action.payload
      state.notFoundError = { isError, log, type }
    }
  }
})

export const { setConnectionError, setNotFoundError } = errorSlice.actions

export default errorSlice.reducer