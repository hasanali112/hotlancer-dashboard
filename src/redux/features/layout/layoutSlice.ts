/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navComponent: {},
  bannerComponent: {},
  featuresComponent: [],
  descriptiveSection: {
    sections: [],
  },
  parallaxSection: {},
  formSection: {},
  faqSection: {},
  footerSection: {},
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
      state.featuresComponent = [];
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

    setFormSection: (state, action) => {
      state.formSection = action.payload;
    },
    resetFormSection: (state) => {
      state.formSection = initialState.formSection;
    },
    setFaqSection: (state, action) => {
      state.faqSection = action.payload;
    },
    resetFaqSection: (state) => {
      state.faqSection = initialState.faqSection;
    },
    setFooterSection: (state, action) => {
      state.footerSection = action.payload;
    },
    resetFooterSection: (state) => {
      state.footerSection = initialState.footerSection;
    },
    resetFull: (state) => {
      state.bannerComponent = {};
      state.navComponent = {};
      state.featuresComponent = [];
      state.descriptiveSection = initialState.descriptiveSection;
      state.parallaxSection = initialState.parallaxSection;
      state.formSection = initialState.formSection;
      state.faqSection = initialState.faqSection;
      state.footerSection = initialState.footerSection;
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
  setFormSection,
  resetFormSection,
  setFaqSection,
  resetFaqSection,
  setFooterSection,
  resetFooterSection,
  resetFull,
} = layoutSlice.actions;
export default layoutSlice.reducer;
