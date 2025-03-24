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
    imageUrl: "/default-banner.jpg",
    imageAlt: "Banner image",
  });

  // Banner styling
  const [backgroundColor, setBackgroundColor] = useState("#f0f4f8");
  const [textColor, setTextColor] = useState("#333333");

  // Layout styles
  const [flexDirection, setFlexDirection] = useState("flex-col md:flex-row");
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
      flexDirection,
      justifyContent,
      alignItems,
      gap,
      padding,
    };

    const config = {
      heading: bannerConfig.heading,
      content: bannerConfig.content,
      showImage: bannerConfig.showImage,
      imageUrl: bannerConfig.imageUrl,
      imageAlt: bannerConfig.imageAlt,
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

          {/* Banner Colors */}
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

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Padding:</label>
              <input
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={padding}
                onChange={(e) => setPadding(e.target.value)}
              />
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
              <input
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={flexDirection}
                onChange={(e) => setFlexDirection(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">
                Justify Content:
              </label>
              <input
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={justifyContent}
                onChange={(e) => setJustifyContent(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Align Items:</label>
              <input
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={alignItems}
                onChange={(e) => setAlignItems(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Gap:</label>
              <input
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={gap}
                onChange={(e) => setGap(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 border border-gray-400 border-dashed" />

      {/* Banner Preview */}
      <div className="my-5 bg-white rounded shadow-lg border border-gray-400 border-dashed p-1">
        <h1 className="mb-2 text-2xl font-semibold">Banner Preview</h1>
        <div
          className={`${flexDirection} ${justifyContent} ${alignItems} ${gap} ${padding} rounded-lg shadow-md w-full mb-6`}
          style={{ backgroundColor, color: textColor }}
        >
          {/* Content Section */}
          {(bannerConfig.heading || bannerConfig.content) && (
            <div className="flex-1">
              {bannerConfig.heading && (
                <h2
                  className="text-xl md:text-2xl font-bold mb-2"
                  style={{ color: textColor }}
                >
                  {bannerConfig.heading}
                </h2>
              )}

              {bannerConfig.content && (
                <div className="text-base" style={{ color: textColor }}>
                  {bannerConfig.content}
                </div>
              )}
            </div>
          )}

          {/* Image Section */}
          {bannerConfig.showImage && bannerConfig.imageUrl && (
            <div className="flex-1">
              <div className="relative w-full h-48 md:h-64">
                <Image
                  src={bannerConfig.imageUrl}
                  alt={bannerConfig.imageAlt}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
