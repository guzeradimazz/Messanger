import { createSlice } from '@reduxjs/toolkit'

export const threadsSlice = createSlice({
  name: 'thread',
  initialState: {
    threads: [],
  },
  reducers: {
    setThreads: (state, action) => {
      state.threads = action.payload
    },
  },
})
export const { setThreads } = threadsSlice.actions
export const selectThreads = state => state.threads
export default threadsSlice.reducer
