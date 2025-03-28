/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

const ParallaxSectionPreview = ({
  parallaxSection,
}: {
  parallaxSection: any;
}) => {
  if (!parallaxSection || Object.keys(parallaxSection).length === 0) {
    return null;
  }

  return (
    <div
      className={`relative w-full flex items-center rounded-lg justify ${
        !parallaxSection || Object.keys(parallaxSection).length === 0
          ? ""
          : " mt-12"
      } ${parallaxSection.textPosition} bg-cover bg-center ${
        parallaxSection.parallaxEffect ? "bg-fixed" : ""
      }`}
      style={{
        height: parallaxSection.height,
        backgroundImage: parallaxSection.image
          ? `url(${parallaxSection.image})`
          : "none",
      }}
    >
      {parallaxSection.image && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: parallaxSection.overlayColor }}
        ></div>
      )}
      <div
        className={`relative z-10 p-8 text-${parallaxSection.textAlignment} w-full`}
        style={{ color: parallaxSection.textColor, maxWidth: "1200px" }}
      >
        {parallaxSection.heading && (
          <h2 className="text-4xl font-bold mb-4">{parallaxSection.heading}</h2>
        )}
        {parallaxSection.subheading && (
          <h3 className="text-2xl font-semibold">
            {parallaxSection.subheading}
          </h3>
        )}
      </div>
    </div>
  );
};

export default ParallaxSectionPreview;
