import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    search: [],
  },
  reducers: {
    filterSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});
export const { filterSearch } = globalSlice.actions;
export default globalSlice.reducer;
