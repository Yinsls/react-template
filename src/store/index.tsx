import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from '@/store/login/loginSlice'
import UserReducer from '@/store/user'

export const store = configureStore({
  reducer: {
    login: LoginReducer,
    user: UserReducer,
  },
})
