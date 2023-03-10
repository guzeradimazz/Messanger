import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logOut: (state,action) => {
      state.user = action.payload
    }
  }
})
export const { setUser, logOut } = userSlice.actions
export const selectUser = (state) => state.user
export default userSlice.reducer
