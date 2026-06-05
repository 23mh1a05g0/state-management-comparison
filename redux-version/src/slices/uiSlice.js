import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",

  initialState: {
    theme: "light",
    notification: null,
  },

  reducers: {},
});

export default uiSlice.reducer;