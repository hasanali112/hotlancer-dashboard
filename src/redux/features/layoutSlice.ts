/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navComponent: {},
};

const layoutSlice = createSlice({
  name: "layout",
  initialState: initialState,
  reducers: {
    setComponent: (state, action) => {
      state.navComponent = action.payload;
    },
    resetNavbar: (state) => {
      state.navComponent = {};
    },
  },
});

export const { setComponent, resetNavbar } = layoutSlice.actions;
export default layoutSlice.reducer;
