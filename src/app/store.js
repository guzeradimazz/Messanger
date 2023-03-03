import userReducer from '../features/userSlice'
import threadsReducer from '../features/threadsSlice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  user: userReducer,
  threads: threadsReducer
})
