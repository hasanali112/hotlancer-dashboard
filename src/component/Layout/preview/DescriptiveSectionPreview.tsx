/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const DescriptiveSectionPreview = ({
  descriptiveSection,
}: {
  descriptiveSection: any;
}) => {
  if (!descriptiveSection || Object.keys(descriptiveSection).length === 0) {
    return null;
  }

  return (
    <div
      className="w-full py-12 px-4"
      style={{ backgroundColor: descriptiveSection.backgroundColor }}
    >
      <div
        className={`max-w-6xl mx-auto flex flex-col md:flex-row gap-8 ${
          descriptiveSection.alignment === "right" ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Images Column */}
        <div className="flex-1">
          {descriptiveSection.images?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {descriptiveSection.images.map((img: string, index: number) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`Descriptive image ${index}`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Text Column */}
        <div className="flex-1" style={{ color: descriptiveSection.textColor }}>
          {descriptiveSection.heading && (
            <h2 className="text-3xl font-bold mb-4">
              {descriptiveSection.heading}
            </h2>
          )}
          {descriptiveSection.subheading && (
            <h3 className="text-xl font-semibold mb-4">
              {descriptiveSection.subheading}
            </h3>
          )}
          {descriptiveSection.description && (
            <p className="text-lg">{descriptiveSection.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptiveSectionPreview;
