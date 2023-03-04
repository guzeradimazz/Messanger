import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: []
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    }
  }
})
export const { setUser } = usersSlice.actions
export const selectUsers = (state) => state.users
export default usersSlice.reducer
