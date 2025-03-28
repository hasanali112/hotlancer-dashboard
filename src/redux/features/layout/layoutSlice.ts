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
  // parallaxSection: {
  //   sections: [
  //     {
  //       backgroundImage: "/default-parallax.jpg",
  //       overlayColor: "rgba(0, 0, 0, 0.5)",
  //       title: "Your Title Here",
  //       subtitle: "Your Subtitle Here",
  //       buttonText: "Learn More",
  //       buttonLink: "#",
  //       styles: {
  //         container: {
  //           height: "500px",
  //           padding: "2rem",
  //         },
  //         content: {
  //           maxWidth: "800px",
  //           textAlign: "center",
  //         },
  //         title: {
  //           color: "#ffffff",
  //           fontSize: "3rem",
  //           fontWeight: "700",
  //           marginBottom: "1rem",
  //         },
  //         subtitle: {
  //           color: "#ffffff",
  //           fontSize: "1.5rem",
  //           fontWeight: "400",
  //           marginBottom: "2rem",
  //         },
  //         button: {
  //           backgroundColor: "#4f46e5",
  //           color: "#ffffff",
  //           padding: "0.75rem 2rem",
  //           borderRadius: "0.375rem",
  //           fontSize: "1rem",
  //           fontWeight: "600",
  //         },
  //       },
  //     },
  //   ],
  // },
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

    // setParallaxSection: (state, action) => {
    //   state.parallaxSection = action.payload;
    // },
    // resetParallaxSection: (state) => {
    //   state.parallaxSection = initialState.parallaxSection;
    // },
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
  // setParallaxSection,
  // resetParallaxSection,
} = layoutSlice.actions;
export default layoutSlice.reducer;
