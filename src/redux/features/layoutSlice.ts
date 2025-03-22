/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layoutJson: [] as any,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState: initialState,
  reducers: {
    setComponent: (state, action) => {
      state.layoutJson.push(action.payload);
    },
  },
});

export const { setComponent } = layoutSlice.actions;
export default layoutSlice.reducer;
