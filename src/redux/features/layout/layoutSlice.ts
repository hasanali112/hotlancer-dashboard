/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navComponent: {},
  bannerComponent: {},
  featuresComponent: {},
  descriptiveSection: {
    sections: [],
  },
  parallaxSection: {},
};

const layoutSlice = createSlice({
  name: "layout",
  initialState: initialState,
  reducers: {
    setComponent: (state, action) => {
      state.navComponent = action.payload;
    },
    setBanner: (state, action) => {
      state.bannerComponent = action.payload;
    },

    setFeatures: (state, action) => {
      state.featuresComponent = action.payload;
    },

    resetNavbar: (state) => {
      state.navComponent = {};
    },
    resetBanner: (state) => {
      state.bannerComponent = {};
    },

    resetFeatures: (state) => {
      state.featuresComponent = {};
    },

    setDescriptiveSection: (state, action) => {
      state.descriptiveSection = action.payload;
    },
    resetDescriptiveSection: (state) => {
      state.descriptiveSection = initialState.descriptiveSection;
    },

    setParallaxSection: (state, action) => {
      state.parallaxSection = action.payload;
    },
    resetParallaxSection: (state) => {
      state.parallaxSection = initialState.parallaxSection;
    },
  },
});

export const {
  setComponent,
  resetNavbar,
  resetBanner,
  setBanner,
  setFeatures,
  resetFeatures,
  setDescriptiveSection,
  resetDescriptiveSection,
  setParallaxSection,
  resetParallaxSection,
} = layoutSlice.actions;
export default layoutSlice.reducer;
