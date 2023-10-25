import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isAuth: boolean
}

const initialState: AuthState = {
  isAuth: !!Cookies.get('token'),
}

export const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    }
  }
})

export const { setIsAuth } = authSlice.actions
export default authSlice.reducer