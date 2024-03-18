import { createSlice } from '@reduxjs/toolkit'

export const botsSlice = createSlice({
  name: 'bot',
  initialState: {
    bots: [],
  },
  reducers: {
    setBots: (state, action) => {
      state.bots = action.payload
    },
  },
})
export const { setBots } = botsSlice.actions
export const selectBots = state => state.bots
export default botsSlice.reducer
