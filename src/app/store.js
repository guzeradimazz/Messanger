import userReducer from '../features/userSlice'
import usersReducer from '../features/usersSlice'
import threadsReducer from '../features/threadsSlice'
import choosedThreadReducer from '../features/choosedThreadSlice'
import currentMessagesReducer from '../features/currentMessages'
import settingsReducer from '../features/settingsSlice'
import themeReducer from '../features/themeSlice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  threads: threadsReducer,
  choosedThread: choosedThreadReducer,
  messages: currentMessagesReducer,
  settings: settingsReducer,
  theme: themeReducer,
})
