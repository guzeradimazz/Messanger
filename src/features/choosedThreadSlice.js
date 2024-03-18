import { createSlice } from '@reduxjs/toolkit'

export const choosedThreadSlice = createSlice({
  name: 'choosedThread',
  initialState: {
    choosedThread: null,
    isSelected: false,
  },
  reducers: {
    setChoosedThread: (state, action) => {
      state.choosedThread = action.payload
      state.isSelected = true
    },
    removeChoosedThread: (state, action) => {
      state.choosedThread = action.payload
      state.isSelected = false
    },
  },
})
export const { setChoosedThread, removeChoosedThread } =
  choosedThreadSlice.actions
export const selectChoosedThread = state => state.choosedThread
export default choosedThreadSlice.reducer
