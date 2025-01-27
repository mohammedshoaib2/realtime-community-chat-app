import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import messagesSlice from "../features/messagesSlice";

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    messagesSlice: messagesSlice,
  },
});

export { store };
