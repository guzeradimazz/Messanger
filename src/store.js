import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './app/store'

export const store = configureStore({ reducer: rootReducer })
