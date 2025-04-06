"use client";

import { Button } from "@/components/ui/button";
import { resetNavbar, setComponent } from "@/redux/features/layout/layoutSlice";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PagNavPreview from "./PagNavPreview";

const PageNav = () => {
  const dispatch = useDispatch();

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
    // Mobile menu configuration
    mobileMenuIcon: "☰", // Default hamburger icon
    mobileMenuOpen: false,
    // Layout classes
    baseClasses: "w-full px-4 sm:px-6", // Base classes for all screens
    display: "flex", // flex
    flexDirection: "flex-row", // flex-row, flex-col for mobile
    justifyContent: "justify-between", // justify-start, justify-center, etc.
    alignItems: "items-center", // items-start, items-center, etc.
    gap: "gap-4", // gap-2, gap-4, etc.
    padding: "py-4", // py-2, py-4, etc.
    // Mobile specific classes
    mobileFlexDirection: "flex-col", // flex direction for mobile
    mobileJustifyContent: "justify-start", // justify content for mobile
    mobileAlignItems: "items-start", // align items for mobile
    mobileGap: "gap-2", // gap for mobile
    mobilePadding: "py-2", // padding for mobile
    // Text styles
    textSize: "text-base", // text size for nav items
    textHover: "hover:text-blue-500", // hover effect
    textTransition: "transition-colors duration-200", // transition effect
    // Brand styles
    brandTextSize: "text-xl", // brand text size
    brandWeight: "font-bold", // brand font weight
    // Mobile menu styles
    mobileMenuClasses: "sm:hidden", // classes for mobile menu button
    navItemContainerClasses: "hidden sm:flex", // classes for nav items container (hidden on mobile)
    mobileNavItemContainerClasses: "flex flex-col w-full", // classes for mobile nav items
  });

  // Navbar styling
  const [brandText, setBrandText] = useState(navConfig.brand);
  const [navbarColor, setNavbarColor] = useState("#ffffff");
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
  const handleStyleChange = (property: string, value: string) => {
    setNavConfig((prevConfig) => ({
      ...prevConfig,
      [property]: value,
    }));
  };

  // Handle saving navbar configuration to Redux store
  const handleSaveNav = () => {
    const config = {
      brand: brandText,
      brandType: navConfig.brandType,
      brandImage: navConfig.brandImage,
      items: navConfig.items,
      mobileMenuIcon: navConfig.mobileMenuIcon,
      classes: {
        baseClasses: navConfig.baseClasses,
        display: navConfig.display,
        flexDirection: navConfig.flexDirection,
        justifyContent: navConfig.justifyContent,
        alignItems: navConfig.alignItems,
        gap: navConfig.gap,
        padding: navConfig.padding,
        mobileFlexDirection: navConfig.mobileFlexDirection,
        mobileJustifyContent: navConfig.mobileJustifyContent,
        mobileAlignItems: navConfig.mobileAlignItems,
        mobileGap: navConfig.mobileGap,
        mobilePadding: navConfig.mobilePadding,
        textSize: navConfig.textSize,
        textHover: navConfig.textHover,
        textTransition: navConfig.textTransition,
        brandTextSize: navConfig.brandTextSize,
        brandWeight: navConfig.brandWeight,
        mobileMenuClasses: navConfig.mobileMenuClasses,
        navItemContainerClasses: navConfig.navItemContainerClasses,
        mobileNavItemContainerClasses: navConfig.mobileNavItemContainerClasses,
      },
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

  return (
    <div className="w-full  rounded-lg">
      {/* Configuration Panel */}
      <div>
        <div className="flex flex-col space-y-6">
          {/* Header with actions */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Navbar</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSaveNav}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Configuration
              </Button>
              <Button
                onClick={handleResetNav}
                variant="outline"
                className="px-6 py-2 text-blue-600 border-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                Reset to Default
              </Button>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Brand Configuration */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Brand Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brand Type Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Brand Type
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="brandType"
                      value="text"
                      checked={navConfig.brandType === "text"}
                      onChange={() => handleBrandTypeChange("text")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Text</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="brandType"
                      value="image"
                      checked={navConfig.brandType === "image"}
                      onChange={() => handleBrandTypeChange("image")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Image</span>
                  </label>
                </div>
              </div>

              {/* Brand Content */}
              {navConfig.brandType === "text" ? (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="brandText"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Brand Text
                    </label>
                    <input
                      id="brandText"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      value={brandText}
                      onChange={(e) => updateBrand(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="brandTextSize"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Text Size
                      </label>
                      <input
                        id="brandTextSize"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        value={navConfig.brandTextSize}
                        onChange={(e) =>
                          handleStyleChange("brandTextSize", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="brandWeight"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Font Weight
                      </label>
                      <input
                        id="brandWeight"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        value={navConfig.brandWeight}
                        onChange={(e) =>
                          handleStyleChange("brandWeight", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Brand Image
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    <label className="cursor-pointer">
                      <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageUpload}
                        />
                      </span>
                    </label>
                    {navConfig.brandImage && (
                      <div className="w-12 h-12 border border-gray-200 rounded-md overflow-hidden">
                        <Image
                          src={navConfig.brandImage}
                          alt="Brand Logo Preview"
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Color Configuration */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Color Scheme
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Background Color
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="color"
                    className="w-12 h-12 rounded cursor-pointer border border-gray-300"
                    value={navbarColor}
                    onChange={(e) => setNavbarColor(e.target.value)}
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      value={navbarColor}
                      onChange={(e) => setNavbarColor(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Text Color
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="color"
                    className="w-12 h-12 rounded cursor-pointer border border-gray-300"
                    value={navbarTextColor}
                    onChange={(e) => setNavbarTextColor(e.target.value)}
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      value={navbarTextColor}
                      onChange={(e) => setNavbarTextColor(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Layout Configuration */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Layout Settings
            </h3>

            {/* Desktop Layout */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-700">
                Desktop Layout
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Base Classes
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.baseClasses}
                    onChange={(e) =>
                      handleStyleChange("baseClasses", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Flex Direction
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.flexDirection}
                    onChange={(e) =>
                      handleStyleChange("flexDirection", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Justify Content
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.justifyContent}
                    onChange={(e) =>
                      handleStyleChange("justifyContent", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Align Items
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.alignItems}
                    onChange={(e) =>
                      handleStyleChange("alignItems", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gap
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.gap}
                    onChange={(e) => handleStyleChange("gap", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Padding
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.padding}
                    onChange={(e) =>
                      handleStyleChange("padding", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-700">
                Mobile Layout
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Flex Direction
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.mobileFlexDirection}
                    onChange={(e) =>
                      handleStyleChange("mobileFlexDirection", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Justify Content
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.mobileJustifyContent}
                    onChange={(e) =>
                      handleStyleChange("mobileJustifyContent", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Align Items
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.mobileAlignItems}
                    onChange={(e) =>
                      handleStyleChange("mobileAlignItems", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gap
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.mobileGap}
                    onChange={(e) =>
                      handleStyleChange("mobileGap", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Padding
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.mobilePadding}
                    onChange={(e) =>
                      handleStyleChange("mobilePadding", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Menu Icon
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    value={navConfig.mobileMenuIcon}
                    onChange={(e) =>
                      handleStyleChange("mobileMenuIcon", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Text Styles */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Text Styles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Text Size
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  value={navConfig.textSize}
                  onChange={(e) =>
                    handleStyleChange("textSize", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hover Effect
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  value={navConfig.textHover}
                  onChange={(e) =>
                    handleStyleChange("textHover", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Transition
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  value={navConfig.textTransition}
                  onChange={(e) =>
                    handleStyleChange("textTransition", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Container Classes */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Container Classes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Menu Button Classes
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  value={navConfig.mobileMenuClasses}
                  onChange={(e) =>
                    handleStyleChange("mobileMenuClasses", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Desktop Nav Container
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  value={navConfig.navItemContainerClasses}
                  onChange={(e) =>
                    handleStyleChange("navItemContainerClasses", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Nav Container
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  value={navConfig.mobileNavItemContainerClasses}
                  onChange={(e) =>
                    handleStyleChange(
                      "mobileNavItemContainerClasses",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <PagNavPreview
        navConfig={navConfig}
        navbarColor={navbarColor}
        navbarTextColor={navbarTextColor}
      />
    </div>
  );
};

export default PageNav;
