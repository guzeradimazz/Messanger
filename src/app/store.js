import userReducer from '../features/userSlice'
import usersReducer from '../features/usersSlice'
import threadsReducer from '../features/threadsSlice'
import choosedThreadReducer from '../features/choosedThreadSlice'
import currentMessagesReducer from '../features/currentMessages'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  threads: threadsReducer,
  choosedThread: choosedThreadReducer,
  messages: currentMessagesReducer
})
