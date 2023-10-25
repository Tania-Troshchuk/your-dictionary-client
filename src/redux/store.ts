import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { wordsAPI } from './services/wordsAPI'
import { userAPI } from './services/userAPI'
import { testAPI } from './services/testAPI'
import { setTokenMiddleware } from '../services/axiosClients'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [wordsAPI.reducerPath]: wordsAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [testAPI.reducerPath]: testAPI.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      setTokenMiddleware,
      wordsAPI.middleware,
      userAPI.middleware,
      testAPI.middleware,
    ])
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
