/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navComponent: {},
  bannerComponent: {},
  featuresComponent: {
    cards: [
      {
        icon: "Rocket",
        title: "Feature 1",
        description: "Description goes here",
        styles: {
          card: {
            backgroundColor: "#ffffff",
            borderColor: "#e0e0e0",
            borderRadius: "0.5rem",
            borderWidth: "1px",
            shadowColor: "rgba(0,0,0,0.1)",
            width: "100%",
            height: "auto",
            padding: "1rem",
          },
          icon: {
            backgroundColor: "#f0f0f0",
            color: "#000000",
            padding: "0.5rem",
            size: "24",
          },
          title: {
            color: "#000000",
            fontSize: "1.25rem",
            fontWeight: "600",
          },
          description: {
            color: "#666666",
            fontSize: "1rem",
          },
        },
        animation: {
          type: "none",
          duration: "500ms",
          delay: "0ms",
          timing: "ease-in-out",
        },
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
      state.featuresComponent = initialState.featuresComponent;
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
} = layoutSlice.actions;
export default layoutSlice.reducer;
