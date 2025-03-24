/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { resetBanner, setBanner } from "@/redux/features/layoutSlice";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Banner = () => {
  const dispatch = useDispatch();

  // Banner content configuration
  const [bannerConfig, setBannerConfig] = useState({
    heading: "Welcome to Our Website",
    content: "Discover amazing features and services tailored just for you.",
    showImage: true,
    imageUrl: "",
    imageAlt: "",
  });

  // Banner styling
  const [backgroundColor, setBackgroundColor] = useState("#f0f4f8");
  const [textColor, setTextColor] = useState("#333333");

  // Text styling options
  const headingSizeOptions = [
    { value: "text-xl", label: "Extra Small" },
    { value: "text-2xl", label: "Small" },
    { value: "text-3xl", label: "Medium" },
    { value: "text-4xl", label: "Large" },
    { value: "text-5xl", label: "Extra Large" },
  ];

  const contentSizeOptions = [
    { value: "text-sm", label: "Small" },
    { value: "text-base", label: "Medium" },
    { value: "text-lg", label: "Large" },
    { value: "text-xl", label: "Extra Large" },
  ];

  const fontFamilyOptions = [
    { value: "font-sans", label: "Sans" },
    { value: "font-serif", label: "Serif" },
    { value: "font-mono", label: "Monospace" },
  ];

  // Text alignment options
  const textAlignOptions = [
    { value: "text-left", label: "Left" },
    { value: "text-center", label: "Center" },
    { value: "text-right", label: "Right" },
    { value: "text-justify", label: "Justify" },
  ];

  // Text styling state
  const [headingSize, setHeadingSize] = useState("text-3xl");
  const [contentSize, setContentSize] = useState("text-base");
  const [fontFamily, setFontFamily] = useState("font-sans");
  const [headingAlign, setHeadingAlign] = useState("text-left");
  const [contentAlign, setContentAlign] = useState("text-left");

  // Flex layout options
  const flexDirectionOptions = [
    { value: "flex-row", label: "Row" },
    { value: "flex-row-reverse", label: "Row Reverse" },
    { value: "flex-col", label: "Column" },
    { value: "flex-col-reverse", label: "Column Reverse" },
  ];

  const justifyContentOptions = [
    { value: "justify-start", label: "Start" },
    { value: "justify-end", label: "End" },
    { value: "justify-center", label: "Center" },
    { value: "justify-between", label: "Space Between" },
    { value: "justify-around", label: "Space Around" },
    { value: "justify-evenly", label: "Space Evenly" },
  ];

  const alignItemsOptions = [
    { value: "items-start", label: "Start" },
    { value: "items-end", label: "End" },
    { value: "items-center", label: "Center" },
    { value: "items-baseline", label: "Baseline" },
    { value: "items-stretch", label: "Stretch" },
  ];

  const gapOptions = [
    { value: "gap-0", label: "None" },
    { value: "gap-2", label: "Small" },
    { value: "gap-4", label: "Medium" },
    { value: "gap-6", label: "Large" },
    { value: "gap-8", label: "Extra Large" },
  ];

  const paddingOptions = [
    { value: "p-0", label: "None" },
    { value: "p-2", label: "Small" },
    { value: "p-4", label: "Medium" },
    { value: "p-6", label: "Large" },
    { value: "p-8", label: "Extra Large" },
  ];

  // Layout styles
  const [display, setDisplay] = useState("flex");
  const [flexDirection, setFlexDirection] = useState("flex-row");
  const [justifyContent, setJustifyContent] = useState("justify-between");
  const [alignItems, setAlignItems] = useState("items-center");
  const [gap, setGap] = useState("gap-6");
  const [padding, setPadding] = useState("p-6");

  // Handle updating banner heading
  const updateHeading = (newHeading: string) => {
    setBannerConfig((prevConfig) => ({
      ...prevConfig,
      heading: newHeading,
    }));
  };

  // Handle updating banner content
  const updateContent = (newContent: string) => {
    setBannerConfig((prevConfig) => ({
      ...prevConfig,
      content: newContent,
    }));
  };

  // Handle updating image URL
  const updateImageUrl = (newUrl: string) => {
    setBannerConfig((prevConfig) => ({
      ...prevConfig,
      imageUrl: newUrl,
    }));
  };

  // Handle toggle image display
  const toggleImageDisplay = (showImage: boolean) => {
    setBannerConfig((prevConfig) => ({
      ...prevConfig,
      showImage,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerConfig((prevConfig) => ({
        ...prevConfig,
        imageUrl: URL.createObjectURL(file),
        showImage: true,
      }));
    }
  };

  // Handle saving banner configuration to Redux store
  const handleSaveBanner = () => {
    const bannerStyles = {
      display,
      flexDirection,
      justifyContent,
      alignItems,
      gap,
      padding,
      headingSize,
      contentSize,
      fontFamily,
      headingAlign,
      contentAlign,
    };

    const config = {
      heading: bannerConfig.heading,
      content: bannerConfig.content,
      showImage: bannerConfig.showImage,
      ...(bannerConfig.imageUrl && { imageUrl: bannerConfig.imageUrl }),
      ...(bannerConfig.imageAlt && { imageAlt: bannerConfig.imageAlt }),
      styles: bannerStyles,
      colors: {
        backgroundColor,
        textColor,
      },
    };

    dispatch(setBanner(config));
  };

  // Handle reset banner configuration
  const handleResetBanner = () => {
    dispatch(resetBanner());
  };

  return (
    <div className="w-full">
      {/* Configuration Panel */}
      <div className="">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Banner Configuration
          </h2>

          <div className="flex gap-2">
            <Button
              onClick={handleSaveBanner}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Save in Layout
            </Button>
            <Button
              onClick={handleResetBanner}
              className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-200 cursor-pointer border border-blue-500"
            >
              Reset
            </Button>
          </div>
        </div>
        <hr className="my-4 border border-gray-400 border-dashed" />

        {/* Banner Content and Style Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner Content */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Heading:</label>
              <input
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={bannerConfig.heading}
                onChange={(e) => updateHeading(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Content:</label>
              <textarea
                className="px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                value={bannerConfig.content}
                onChange={(e) => updateContent(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Image:</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={bannerConfig.showImage}
                    onChange={(e) => toggleImageDisplay(e.target.checked)}
                  />
                  Show Image
                </label>
              </div>
            </div>

            {bannerConfig.showImage && (
              <>
                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700">
                    Image URL:
                  </label>
                  <input
                    type="text"
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={bannerConfig.imageUrl}
                    onChange={(e) => updateImageUrl(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700">
                    Upload Image:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    onChange={handleImageUpload}
                  />
                </div>
              </>
            )}
          </div>

          {/* Banner Colors and Text Styles */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">
                Background Color:
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
                <span className="ml-3 text-gray-500">{backgroundColor}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Text Color:</label>
              <div className="flex items-center">
                <input
                  type="color"
                  className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
                <span className="ml-3 text-gray-500">{textColor}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Text Styles</h4>

              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-700">
                  Heading Size:
                </label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={headingSize}
                  onChange={(e) => setHeadingSize(e.target.value)}
                >
                  {headingSizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-700">
                  Heading Alignment:
                </label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={headingAlign}
                  onChange={(e) => setHeadingAlign(e.target.value)}
                >
                  {textAlignOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-700">
                  Content Size:
                </label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={contentSize}
                  onChange={(e) => setContentSize(e.target.value)}
                >
                  {contentSizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-700">
                  Content Alignment:
                </label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={contentAlign}
                  onChange={(e) => setContentAlign(e.target.value)}
                >
                  {textAlignOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-700">
                  Font Family:
                </label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                >
                  {fontFamilyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Layout Styles */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Banner Layout Styles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">
                Flex Direction:
              </label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={flexDirection}
                onChange={(e) => setFlexDirection(e.target.value)}
              >
                {flexDirectionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">
                Justify Content:
              </label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={justifyContent}
                onChange={(e) => setJustifyContent(e.target.value)}
              >
                {justifyContentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Align Items:</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={alignItems}
                onChange={(e) => setAlignItems(e.target.value)}
              >
                {alignItemsOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Gap:</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={gap}
                onChange={(e) => setGap(e.target.value)}
              >
                {gapOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Padding:</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={padding}
                onChange={(e) => setPadding(e.target.value)}
              >
                {paddingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 border border-gray-400 border-dashed" />

      {/* Banner Preview - Completely dynamic with no extra CSS */}
      <div className="my-5">
        <h1 className="mb-2 text-2xl font-semibold">Banner Preview</h1>
        <div
          className={`${display} ${flexDirection} ${justifyContent} ${alignItems} ${gap} ${padding} ${fontFamily} rounded-lg overflow-hidden`}
          style={{
            backgroundColor,
            color: textColor,
          }}
        >
          {/* Content Section */}
          <div className="flex-1 p-4">
            {bannerConfig.heading && (
              <h2 className={`${headingSize} ${headingAlign} font-bold mb-2`}>
                {bannerConfig.heading}
              </h2>
            )}

            {bannerConfig.content && (
              <div className={`${contentSize} ${contentAlign}`}>
                {bannerConfig.content}
              </div>
            )}
          </div>

          {/* Image Section */}
          {bannerConfig.showImage && bannerConfig.imageUrl && (
            <div className="relative w-full max-w-md h-48">
              <Image
                src={bannerConfig.imageUrl}
                alt={bannerConfig.imageAlt}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
