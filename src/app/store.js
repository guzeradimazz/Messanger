import userReducer from '../features/userSlice'
import threadsReducer from '../features/threadsSlice'
import choosedThreadReducer from '../features/choosedThreadSlice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  user: userReducer,
  threads: threadsReducer,
  choosedThread: choosedThreadReducer
})
