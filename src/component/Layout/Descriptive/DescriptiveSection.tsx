"use client";

import { Button } from "@/components/ui/button";
import {
  resetDescriptiveSection,
  setDescriptiveSection,
} from "@/redux/features/layout/layoutSlice";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const DescriptiveSection = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<"upload" | "link">("upload");

  // Section configuration
  const [sectionConfig, setSectionConfig] = useState({
    images: [] as string[],
    heading: "",
    subheading: "",
    description: "",
    alignment: "left", // 'left' or 'right'
    backgroundColor: "#ffffff",
    textColor: "#333333",
  });

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSectionConfig((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  // Handle adding image via URL
  const handleAddImageUrl = (url: string) => {
    if (url.trim()) {
      setSectionConfig((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));
    }
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setSectionConfig((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle text change
  const handleTextChange = (
    field: "heading" | "subheading" | "description",
    value: string
  ) => {
    setSectionConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle alignment change
  const handleAlignmentChange = (alignment: "left" | "right") => {
    setSectionConfig((prev) => ({
      ...prev,
      alignment,
    }));
  };

  // Save configuration to Redux
  const handleSaveSection = () => {
    dispatch(setDescriptiveSection(sectionConfig));
  };

  // Reset configuration
  const handleResetSection = () => {
    setSectionConfig({
      images: [],
      heading: "",
      subheading: "",
      description: "",
      alignment: "left",
      backgroundColor: "#ffffff",
      textColor: "#333333",
    });
    dispatch(resetDescriptiveSection());
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Descriptive Section Configuration
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={handleSaveSection}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Save in Layout
          </Button>
          <Button
            onClick={handleResetSection}
            className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-200 cursor-pointer border border-blue-500"
          >
            Reset
          </Button>
        </div>
      </div>
      <hr className="my-4 border border-gray-400 border-dashed" />

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {/* Images Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Images</h3>

          {/* Upload Method Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 ${
                activeTab === "upload"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("upload")}
            >
              Upload Files
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "link"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("link")}
            >
              Add by URL
            </button>
          </div>

          {activeTab === "upload" ? (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter image URL"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddImageUrl(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    handleAddImageUrl(input.value);
                    input.value = "";
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* Image Preview Gallery */}
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Image Preview</h4>
            {sectionConfig.images.length === 0 ? (
              <p className="text-gray-500">No images added yet</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {sectionConfig.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={img}
                      alt={`Preview ${index}`}
                      width={100}
                      height={100}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Text Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Text Content</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Heading</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={sectionConfig.heading}
                onChange={(e) => handleTextChange("heading", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Subheading</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={sectionConfig.subheading}
                onChange={(e) => handleTextChange("subheading", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
                value={sectionConfig.description}
                onChange={(e) =>
                  handleTextChange("description", e.target.value)
                }
              />
            </div>
          </div>

          {/* Alignment */}
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Image Alignment</h4>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="alignment"
                  checked={sectionConfig.alignment === "left"}
                  onChange={() => handleAlignmentChange("left")}
                />
                Images on Left
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="alignment"
                  checked={sectionConfig.alignment === "right"}
                  onChange={() => handleAlignmentChange("right")}
                />
                Images on Right
              </label>
            </div>
          </div>

          {/* Colors */}
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">
                Background Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  className="w-10 h-10 rounded cursor-pointer"
                  value={sectionConfig.backgroundColor}
                  onChange={(e) =>
                    setSectionConfig((prev) => ({
                      ...prev,
                      backgroundColor: e.target.value,
                    }))
                  }
                />
                <span>{sectionConfig.backgroundColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Text Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  className="w-10 h-10 rounded cursor-pointer"
                  value={sectionConfig.textColor}
                  onChange={(e) =>
                    setSectionConfig((prev) => ({
                      ...prev,
                      textColor: e.target.value,
                    }))
                  }
                />
                <span>{sectionConfig.textColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <hr className="my-6 border border-gray-400 border-dashed" />
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Preview</h3>
      <div
        className="p-6 rounded-lg border border-dashed border-gray-400"
        style={{ backgroundColor: sectionConfig.backgroundColor }}
      >
        <div
          className={`flex flex-col md:flex-row gap-6 ${
            sectionConfig.alignment === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Images Column */}
          <div className="flex-1">
            {sectionConfig.images.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {sectionConfig.images.map((img, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={img}
                      alt={`Preview ${index}`}
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Images will appear here</p>
              </div>
            )}
          </div>

          {/* Text Column */}
          <div className="flex-1" style={{ color: sectionConfig.textColor }}>
            {sectionConfig.heading ? (
              <h2 className="text-3xl font-bold mb-3">
                {sectionConfig.heading}
              </h2>
            ) : (
              <div className="h-8 bg-gray-200 rounded mb-3"></div>
            )}

            {sectionConfig.subheading ? (
              <h3 className="text-xl font-semibold mb-4">
                {sectionConfig.subheading}
              </h3>
            ) : (
              <div className="h-6 bg-gray-200 rounded mb-4 w-2/3"></div>
            )}

            {sectionConfig.description ? (
              <p className="text-lg">{sectionConfig.description}</p>
            ) : (
              <>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptiveSection;
