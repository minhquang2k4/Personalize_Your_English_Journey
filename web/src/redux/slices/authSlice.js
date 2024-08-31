import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.isLogin = true
      state.user = action.payload
    }, // auto create type action: auth/LOGIN'
    LOGOUT: (state) => {
      state.isLogin = false
      state.user = null
    } //type action: 'auth/LOGOUT'
  }
})

export const { LOGIN, LOGOUT } = authSlice.actions
export default authSlice.reducer