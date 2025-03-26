/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppSelector } from "@/redux/hook";
import React from "react";
import NavPreview from "./NavPreview";
import BanPreview from "./BanPreview";

import FeaturesPreview from "./FeaturePreview";
import { useCreateLayoutMutation } from "@/redux/features/layout/layout.api";
import DescriptiveSectionPreview from "./DescriptiveSectionPreview";

const Preview = () => {
  const {
    navComponent,
    bannerComponent,
    featuresComponent,
    descriptiveSection,
  } = useAppSelector((state) => state.layout as any);
  const [createLayout] = useCreateLayoutMutation();

  const handleComponent = async () => {
    const data = {
      ...(navComponent && { navComponent: navComponent }),
      ...(bannerComponent && { bannerComponent: bannerComponent }),
      ...(featuresComponent && { featuresComponent }),
    };
    try {
      const response = await createLayout(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-lg shadow-blue-200 rounded-lg w-full">
      <div className="bg-white p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Preview</h2>
        <div className="border border-gray-200 rounded-md">
          <div className="p-4 flex flex-col justify-center items-center min-h-32 bg-gray-100 rounded">
            {/* Navbar */}
            {navComponent && <NavPreview navComponent={navComponent} />}
            {bannerComponent && (
              <BanPreview bannerComponent={bannerComponent} />
            )}
            {featuresComponent && (
              <FeaturesPreview featuresComponent={featuresComponent} />
            )}
            {descriptiveSection && (
              <DescriptiveSectionPreview
                sections={descriptiveSection.sections}
              />
            )}
          </div>
          <div className="p-8 flex justify-center items-center min-h-32 bg-gray-100 rounded">
            <h1 className="text-2xl font-semibold text-gray-700">
              Page Content Area
            </h1>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 p-6 bg-gray-50 border-t border-gray-200">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md transition duration-200">
          Reset
        </button>
        <button
          onClick={handleComponent}
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default Preview;
