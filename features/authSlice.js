import { createSlice } from "@reduxjs/toolkit";

const initialData = {
  userData: null,
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState: initialData,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },

    logout: (state, action) => {
      state.userData = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
