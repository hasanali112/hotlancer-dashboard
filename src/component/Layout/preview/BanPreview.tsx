"use client";

import Image from "next/image";
import React from "react";

interface BannerComponent {
  styles?: {
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    padding?: string;
    headingSize?: string;
    contentSize?: string;
    fontFamily?: string;
    headingAlign?: string;
    contentAlign?: string;
    headingWeight?: string;
    contentWeight?: string;
  };
  colors?: {
    backgroundColor?: string;
    textColor?: string;
  };
  heading?: string;
  content?: string;
  showImage?: boolean;
  imageUrl?: string;
  imageAlt?: string;
}

const BannerPreview = ({
  bannerComponent,
}: {
  bannerComponent?: BannerComponent;
}) => {
  // Provide default values
  const {
    styles = {},
    colors = {},
    heading = "",
    content = "",
    showImage = false,
    imageUrl = "",
    imageAlt = "",
  } = bannerComponent || {};

  return (
    <div className="w-full">
      <div
        className={`${styles.display} ${styles.flexDirection} ${styles.justifyContent} ${styles.alignItems} ${styles.gap} ${styles.padding} ${styles.fontFamily}`}
        style={{
          backgroundColor: colors.backgroundColor,
          color: colors.textColor,
        }}
      >
        {/* Content Section */}
        <div>
          {heading && (
            <h2
              className={`${styles.headingSize} ${styles.headingAlign} ${styles.headingWeight}`}
            >
              {heading}
            </h2>
          )}
          {content && (
            <div
              className={`${styles.contentSize} ${styles.contentAlign} ${styles.contentWeight}`}
            >
              {content}
            </div>
          )}
        </div>

        {/* Image Section */}
        {showImage && imageUrl && (
          <div>
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={500}
              height={500}
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerPreview;
