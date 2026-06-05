import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    name: "Vali",
    isLoggedIn: true,
  },

  reducers: {},
});

export default userSlice.reducer;