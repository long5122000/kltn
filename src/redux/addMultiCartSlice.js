import { createSlice } from "@reduxjs/toolkit";
import { startAfter } from "firebase/firestore";
import { useEffect } from "react";

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
        if (itemExists.totalquantyti < itemExists.quality) {
          itemExists.totalquantyti = itemExists.totalquantyti + state.count;
        }
      } else {
        state.cart.push({ ...action.payload, totalquantyti: state.count });
      }
    },

    increment: (state) => ({ ...state, count: state.count + 1 }),
    decrement: (state) => ({ ...state, count: state.count - 1 }),

    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.totalquantyti++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.totalquantyti === 1) {
        const index = state.cart.findIndex(
          (item) => item.id === action.payload
        );
        state.cart.splice(index, 1);
      } else {
        item.totalquantyti--;
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
