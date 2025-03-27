/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navComponent: {},
  bannerComponent: {},
  featuresComponent: {},
  descriptiveSection: {
    sections: [
      {
        images: [],
        heading: "Heading Text",
        subheading: "Subheading Text",
        description: "Description text goes here",
        styles: {
          container: {
            backgroundColor: "#ffffff",
            padding: "2rem",
            margin: "0 auto",
            maxWidth: "1200px",
          },
          content: {
            textAlign: "left",
          },
          heading: {
            color: "#000000",
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "1rem",
          },
          subheading: {
            color: "#666666",
            fontSize: "1.25rem",
            fontWeight: "500",
            marginBottom: "0.5rem",
          },
          description: {
            color: "#333333",
            fontSize: "1rem",
            lineHeight: "1.5",
          },
          imageContainer: {
            borderRadius: "0.5rem",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          },
        },
        layout: "image-left", // 'image-left' or 'image-right'
      },
    ],
  },
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
} = layoutSlice.actions;
export default layoutSlice.reducer;
