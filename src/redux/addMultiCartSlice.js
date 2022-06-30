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
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quality++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quality === 1) {
        const index = state.cart.findIndex(
          (item) => item.id === action.payload
        );
        state.cart.splice(index, 1);
      } else {
        item.quality--;
      }
    },
    resetCount: (state, action) => {
      state.count = 1;
    },
    resetCart: (state, action) => {
      state.cart = [];
    },
  },
});
export const {
  addToCart,
  increment,
  decrement,
  incrementQuantity,
  decrementQuantity,
  resetCount,
  resetCart,
} = addMultiCartSlice.actions;
export default addMultiCartSlice.reducer;
