import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: false,
  },
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload
    },
  },
})
export const { setSettings } = settingsSlice.actions
export const selectSettings = state => state.settings
export default settingsSlice.reducer
