import { configureStore } from '@reduxjs/toolkit'

import { articleReducer } from './articleReducer'
import { usersReducer } from './usersReducer'

export const store = configureStore({
  reducer: {
    article: articleReducer,
    users: usersReducer,
  },
})
