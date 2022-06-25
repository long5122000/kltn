import { createSlice } from "@reduxjs/toolkit";
import { startAfter } from "firebase/firestore";

export const addMultiCartSlice = createSlice({
  name: "count",
  initialState: {
    count: 1,
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemExists) {
        itemExists.quality = itemExists.quality + state.count;
      } else {
        state.cart.push({ ...action.payload, quality: state.count });
      }
    },
    increment: (state) => ({ ...state, count: state.count + 1 }),
    decrement: (state) => ({ ...state, count: state.count - 1 }),
  },
});
export const { addToCart, increment, decrement } = addMultiCartSlice.actions;
export default addMultiCartSlice.reducer;
