import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isOpen: true,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      state.items.push({
        productId: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        quantity: 1,
      });
    },
  },
});

export const {
  addToCart,
} = cartSlice.actions;

export default cartSlice.reducer;