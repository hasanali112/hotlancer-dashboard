/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";

const DescriptiveSectionPreview = ({ sections }: { sections: any[] }) => {
  return (
    <div className="w-full space-y-12">
      {sections.map((section, index) => (
        <div
          key={index}
          style={{
            backgroundColor: section.styles.container.backgroundColor,
            padding: section.styles.container.padding,
            margin: section.styles.container.margin,
            maxWidth: section.styles.container.maxWidth,
          }}
          className={`flex ${
            section.layout === "image-left" ? "flex-row" : "flex-row-reverse"
          } gap-8 items-center`}
        >
          {/* Image Container */}
          {section.images.length > 0 && (
            <div
              style={{
                borderRadius: section.styles.imageContainer.borderRadius,
                overflow: section.styles.imageContainer.overflow,
                boxShadow: section.styles.imageContainer.boxShadow,
                flex: "1",
              }}
              className="bg-gray-50" // Added subtle background
            >
              <div
                className={`${
                  section.images.length > 2
                    ? "grid grid-cols-2 gap-4"
                    : "flex flex-col gap-4"
                }`}
              >
                {section.images.map((img: string, imgIndex: number) => (
                  <div
                    key={imgIndex}
                    className="relative aspect-video overflow-hidden rounded-md"
                  >
                    <Image
                      src={img}
                      alt={`Descriptive image ${imgIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Text Content */}
          <div style={{ flex: "1" }} className="space-y-4">
            <h2
              style={{
                color: section.styles.heading.color,
                fontSize: section.styles.heading.fontSize,
                fontWeight: section.styles.heading.fontWeight,
                marginBottom: section.styles.heading.marginBottom,
              }}
              className="font-bold"
            >
              {section.heading}
            </h2>
            {section.subheading && (
              <h3
                style={{
                  color: section.styles.subheading.color,
                  fontSize: section.styles.subheading.fontSize,
                  fontWeight: section.styles.subheading.fontWeight,
                  marginBottom: section.styles.subheading.marginBottom,
                }}
                className="font-semibold"
              >
                {section.subheading}
              </h3>
            )}
            <p
              style={{
                color: section.styles.description.color,
                fontSize: section.styles.description.fontSize,
                lineHeight: section.styles.description.lineHeight,
              }}
              className="text-justify"
            >
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DescriptiveSectionPreview;
