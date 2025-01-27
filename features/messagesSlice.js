import { createSlice } from "@reduxjs/toolkit";

const initialData = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messagesSlice",
  initialState: initialData,
  reducers: {
    feedMessages: (state, action) => {
      state.messages = action.payload.documents;
    },

    updateMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { feedMessages, updateMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
