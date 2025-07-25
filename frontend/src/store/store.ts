import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from './slices/authSlice'
import gameReducer from './slices/gameSlice'
import uiReducer from './slices/uiSlice'
import { api } from './api/apiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setCredentials'],
      },
    }).concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch