/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";

const Banner = ({
  showBanner = true,
  heading,
  content,
  showImage = false,
  imageUrl,
  imageAlt = "Banner image",
  backgroundColor = "#f0f4f8",
  textColor = "#333333",
}: any) => {
  if (!showBanner) {
    return null;
  }

  return (
    <div
      className="flex flex-col md:flex-row items-center p-6 rounded-lg shadow-md w-full"
      style={{ backgroundColor }}
    >
      {/* Content Section */}
      {(heading || content) && (
        <div
          className={`flex-1 ${
            showImage && imageUrl ? "md:mr-6" : ""
          } mb-4 md:mb-0`}
        >
          {heading && (
            <h2
              className="text-xl md:text-2xl font-bold mb-2"
              style={{ color: textColor }}
            >
              {heading}
            </h2>
          )}

          {content && (
            <div className="text-base" style={{ color: textColor }}>
              {content}
            </div>
          )}
        </div>
      )}

      {/* Image Section */}
      {showImage && imageUrl && (
        <div className={`flex-1 ${heading || content ? "md:ml-6" : ""}`}>
          <div className="relative w-full h-48 md:h-64">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
