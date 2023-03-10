import { createSlice } from '@reduxjs/toolkit'

export const currentMessagesSlice = createSlice({
  name: 'currentMessages',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
  },
})
export const { setMessages } = currentMessagesSlice.actions
export const selectCurrentMessages = state => state.messages
export default currentMessagesSlice.reducer
