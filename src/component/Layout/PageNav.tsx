"use client";

import { Button } from "@/components/ui/button";
import { resetNavbar, setComponent } from "@/redux/features/layoutSlice";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const PageNav = () => {
  const dispatch = useDispatch();

  // Local state for input fields
  const [flexDirection, setFlexDirection] = useState("flex");
  const [justifyContent, setJustifyContent] = useState("justify-between");
  const [alignItems, setAlignItems] = useState("items-center");
  const [gap, setGap] = useState("gap-4");

  // Navbar configuration
  const [navConfig, setNavConfig] = useState({
    brand: "Brand Name",
    brandType: "text", // 'text' or 'image'
    brandImage: "", // Use an empty string instead of null
    items: [
      { label: "Home", url: "/" },
      { label: "About", url: "/about" },
      { label: "Services", url: "/services" },
      { label: "Contact", url: "/contact" },
    ],
  });

  // Navbar styling
  const [brandText, setBrandText] = useState(navConfig.brand);
  const [navbarStyle, setNavbarStyle] = useState({ value: "default" });
  const [navbarColor, setNavbarColor] = useState("#e2dfdf");
  const [navbarTextColor, setNavbarTextColor] = useState("#333333");

  // Update brand in nav config when brandText changes
  const updateBrand = (newBrand: string) => {
    setBrandText(newBrand);
    setNavConfig((prevConfig) => ({
      ...prevConfig,
      brand: newBrand,
    }));
  };

  // Handle brand type change (text or image)
  const handleBrandTypeChange = (type: "text" | "image") => {
    setNavConfig((prevConfig) => ({
      ...prevConfig,
      brandType: type,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNavConfig((prevConfig) => ({
        ...prevConfig,
        brandImage: URL.createObjectURL(file),
      }));
    }
  };

  // Handle style change
  const handleStyleChange = (value: string) => {
    setNavbarStyle({ value });
  };

  // Handle saving navbar configuration to Redux store
  const handleSaveNav = () => {
    const navbarStyles = {
      flexDirection,
      justifyContent,
      alignItems,
      gap,
    };
    const config = {
      brand: brandText,
      brandType: navConfig.brandType,
      brandImage: navConfig.brandImage,
      items: navConfig.items,
      navStyles: navbarStyles,
      colors: {
        backgroundColor: navbarColor,
        textColor: navbarTextColor,
      },
    };
    dispatch(setComponent(config));
  };

  const handleResetNav = () => {
    dispatch(resetNavbar());
  };

  // Get padding based on selected style
  const getPadding = () => {
    switch (navbarStyle.value) {
      case "minimal":
        return "py-2";
      case "extended":
        return "py-6";
      default:
        return "py-4";
    }
  };

  return (
    <div className="w-full">
      {/* Configuration Panel */}
      <div className="">
        <div className="flex justify-between ">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Navbar Configuration
          </h2>

          <div className="flex gap-2">
            <Button
              onClick={handleSaveNav}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Save in Layout
            </Button>
            <Button
              onClick={handleResetNav}
              className="px-4 py-2 bg-white text-blue-500  rounded hover:bg-gray-200 cursor-pointer border border-blue-500"
            >
              Reset
            </Button>
          </div>
        </div>
        <hr className="my-4 border border-gray-400 border-dashed" />

        {/* Navbar Color and Style Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Navbar Brand and Style */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Brand Type:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="brandType"
                    value="text"
                    checked={navConfig.brandType === "text"}
                    onChange={() => handleBrandTypeChange("text")}
                  />
                  Text
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="brandType"
                    value="image"
                    checked={navConfig.brandType === "image"}
                    onChange={() => handleBrandTypeChange("image")}
                  />
                  Image
                </label>
              </div>
            </div>

            {navConfig.brandType === "text" ? (
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-700">Brand Text:</label>
                <input
                  type="text"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={brandText}
                  onChange={(e) => updateBrand(e.target.value)}
                />
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-700">
                  Brand Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  onChange={handleImageUpload}
                />
              </div>
            )}

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Navbar Style:</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={navbarStyle.value}
                onChange={(e) => handleStyleChange(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="minimal">Minimal</option>
                <option value="extended">Extended</option>
              </select>
            </div>
          </div>

          {/* Navbar Colors */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">
                Background Color:
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                  value={navbarColor}
                  onChange={(e) => setNavbarColor(e.target.value)}
                />
                <span className="ml-3 text-gray-500">{navbarColor}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Text Color:</label>
              <div className="flex items-center">
                <input
                  type="color"
                  className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                  value={navbarTextColor}
                  onChange={(e) => setNavbarTextColor(e.target.value)}
                />
                <span className="ml-3 text-gray-500">{navbarTextColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar Layout Styles */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Navbar Layout Styles
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

      {/* Actual Navbar Preview */}
      <div className="my-5 bg-white rounded shadow-lg border border-gray-400 border-dashed p-1">
        <h1 className="mb-2 text-2xl font-semibold">Navbar Preview</h1>
        <nav
          className={`w-full px-6 ${gap}  ${flexDirection} ${justifyContent} ${alignItems} ${getPadding()} mb-6 rounded`}
          style={{ backgroundColor: navbarColor, color: navbarTextColor }}
        >
          {navConfig.brandType === "text" ? (
            <div className="font-bold text-xl">{navConfig.brand}</div>
          ) : (
            navConfig.brandImage && (
              <Image
                src={navConfig.brandImage}
                alt="Brand Logo"
                width={100}
                height={100}
                className="w-10"
              />
            )
          )}
          <div className="flex items-center space-x-4">
            {navConfig.items.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="hover:text-blue-500 transition-colors duration-200"
                style={{ color: navbarTextColor }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default PageNav;
