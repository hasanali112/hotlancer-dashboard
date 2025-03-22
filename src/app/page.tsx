/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import PageNav from "@/component/Layout/PageNav";
import Banner from "@/component/Layout/Banner"; // Import the Banner component
import { useAppDispatch } from "@/redux/hook";
import { setComponent } from "@/redux/features/layoutSlice";
import Features from "@/component/Layout/Features";
import {
  defaultFeatures,
  defaultFeaturesProps,
} from "@/Constant/DefaultValues";
import { Feature } from "@/types/Interface";

const Home = () => {
  // Navbar State
  const [showNavbar, setShowNavbar] = useState(true);
  const [navbarColor, setNavbarColor] = useState("#ffffff");
  const [navbarTextColor, setNavbarTextColor] = useState("#333333");
  const [navbarStyle, setNavbarStyle] = useState({
    value: "default", // Style type (default, minimal, extended)
    padding: "py-4", // Padding value based on style
  });
  const [brandText, setBrandText] = useState("My Site");
  const [navConfig, setNavConfig] = useState({
    brand: brandText || "My Site",
    items: [
      { label: "Home", url: "/" },
      { label: "About", url: "/about" },
      { label: "Services", url: "/services" },
      { label: "Contact", url: "/contact" },
    ],
  });

  // Banner State
  const [showBanner, setShowBanner] = useState(true);
  const [bannerHeading, setBannerHeading] = useState("Welcome to My Site");
  const [bannerContent, setBannerContent] = useState(
    "This is a sample banner content."
  );
  const [showBannerImage, setShowBannerImage] = useState(false);
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [bannerBackgroundColor, setBannerBackgroundColor] = useState("#f0f4f8");
  const [bannerTextColor, setBannerTextColor] = useState("#333333");

  // Features State
  const [showFeatures, setShowFeatures] = useState(
    defaultFeaturesProps.showFeatures
  );
  const [featuresHeading, setFeaturesHeading] = useState(
    defaultFeaturesProps.heading
  );
  const [featuresSubheading, setFeaturesSubheading] = useState(
    defaultFeaturesProps.subheading
  );
  const [featuresBackgroundColor, setFeaturesBackgroundColor] = useState(
    defaultFeaturesProps.backgroundColor
  );

  // New separate text color states
  const [headingTextColor, setHeadingTextColor] = useState(
    defaultFeaturesProps.headingTextColor || "#333333"
  );
  const [subheadingTextColor, setSubheadingTextColor] = useState(
    defaultFeaturesProps.subheadingTextColor || "#666666"
  );
  const [featureItemTextColor, setFeatureItemTextColor] = useState(
    defaultFeaturesProps.featureItemTextColor || "#333333"
  );

  // Card & Icon Default Styles - Fix type for border style and animation style
  const [cardDefaultBgColor, setCardDefaultBgColor] = useState(
    defaultFeaturesProps.cardDefaultBgColor
  );
  const [cardDefaultBorderColor, setCardDefaultBorderColor] = useState(
    defaultFeaturesProps.cardDefaultBorderColor
  );
  const [cardDefaultBorderStyle, setCardDefaultBorderStyle] = useState<
    "solid" | "dashed" | "dotted" | "none"
  >(
    defaultFeaturesProps.cardDefaultBorderStyle as
      | "solid"
      | "dashed"
      | "dotted"
      | "none"
  );
  const [cardDefaultBorderWidth, setCardDefaultBorderWidth] = useState(
    defaultFeaturesProps.cardDefaultBorderWidth
  );
  const [cardDefaultBorderRadius, setCardDefaultBorderRadius] = useState(
    defaultFeaturesProps.cardDefaultBorderRadius
  );
  const [iconDefaultColor, setIconDefaultColor] = useState(
    defaultFeaturesProps.iconDefaultColor
  );
  const [iconDefaultBgColor, setIconDefaultBgColor] = useState(
    defaultFeaturesProps.iconDefaultBgColor
  );
  const [animationStyle, setAnimationStyle] = useState<
    "fade" | "scale" | "slide" | "bounce" | "none"
  >(
    defaultFeaturesProps.animationStyle as
      | "fade"
      | "scale"
      | "slide"
      | "bounce"
      | "none"
  );

  // Fix type for features array
  const [features, setFeatures] = useState<Feature[]>(() => {
    // Convert defaultFeatures to match the Feature interface
    return defaultFeatures.map((feature) => ({
      ...feature,
      cardBorderStyle: feature.cardBorderStyle as
        | "solid"
        | "dashed"
        | "dotted"
        | "none",
    }));
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    setNavConfig((prevConfig) => ({
      ...prevConfig,
      brand: brandText,
    }));
  }, [brandText]);

  const handleSaveNav = () => {
    const navbarData = {
      navBgColor: navbarColor,
      navTextColor: navbarTextColor,
      navStyle: navbarStyle, // Include both value and padding
      brandText: brandText,
      navConfig: navConfig.items,
    };

    if (showNavbar) {
      dispatch(setComponent(navbarData));
    }
  };

  const handleSaveBanner = () => {
    const bannerData = {
      showBanner,
      heading: bannerHeading,
      content: bannerContent,
      showImage: showBannerImage,
      imageUrl: bannerImageUrl,
      backgroundColor: bannerBackgroundColor,
      textColor: bannerTextColor,
    };

    if (showBanner) {
      dispatch(setComponent({ banner: bannerData }));
    }
  };

  // Handle saving features section to Redux store
  const handleSaveFeatures = () => {
    const featuresData = {
      showFeatures,
      heading: featuresHeading,
      subheading: featuresSubheading,
      backgroundColor: featuresBackgroundColor,
      headingTextColor, // New separate text colors
      subheadingTextColor,
      featureItemTextColor,
      cardDefaultBgColor,
      cardDefaultBorderColor,
      cardDefaultBorderStyle,
      cardDefaultBorderWidth,
      cardDefaultBorderRadius,
      iconDefaultColor,
      iconDefaultBgColor,
      animationStyle,
      features: features,
    };

    if (showFeatures) {
      dispatch(setComponent({ features: featuresData }));
    }
  };

  // Function to update a specific feature
  const handleFeatureUpdate = (
    index: number,
    updatedFeature: Partial<Feature>
  ) => {
    setFeatures((prevFeatures) => {
      const newFeatures = [...prevFeatures];
      newFeatures[index] = { ...newFeatures[index], ...updatedFeature };
      return newFeatures;
    });
  };

  // Apply default styles to all features
  const applyDefaultStyles = () => {
    setFeatures((prevFeatures) => {
      return prevFeatures.map((feature) => ({
        ...feature,
        iconColor: iconDefaultColor,
        iconBgColor: iconDefaultBgColor,
        cardBgColor: cardDefaultBgColor,
        cardBorderColor: cardDefaultBorderColor,
        cardBorderStyle: cardDefaultBorderStyle,
        cardBorderWidth: cardDefaultBorderWidth,
        cardBorderRadius: cardDefaultBorderRadius,
      }));
    });
  };

  // Add UI elements to use the setters that were previously unused
  const handleBorderStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCardDefaultBorderStyle(
      e.target.value as "solid" | "dashed" | "dotted" | "none"
    );
  };

  const handleBorderWidthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCardDefaultBorderWidth(e.target.value);
  };

  const handleBorderRadiusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCardDefaultBorderRadius(e.target.value);
  };
  // Update navbarStyle when the style value changes
  const handleStyleChange = (value: string) => {
    let padding;
    switch (value) {
      case "minimal":
        padding = "py-2";
        break;
      case "extended":
        padding = "py-6";
        break;
      default:
        padding = "py-4";
    }
    setNavbarStyle({ value, padding });
  };

  return (
    <div className="w-full max-w-[1540px] mx-auto px-6 min-h-screen bg-gray-50">
      <div className="py-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Layout Configuration
        </h1>
        <p className="text-gray-600 mt-2">
          Customize your page navigation and layout
        </p>
        <hr className="my-6 border-gray-200" />

        <div className="grid grid-cols-12 gap-8 ">
          <div className="col-span-5">
            {/* Navbar Configuration Panel */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Navigation Settings
              </h2>

              {/* Navbar Toggle */}
              <div className="flex items-center mb-6 pb-4 border-b border-gray-100 gap-4">
                <div className="flex items-center gap-1">
                  <input
                    id="navbar"
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 mr-1"
                    checked={showNavbar}
                    onChange={() => setShowNavbar(!showNavbar)}
                  />
                  <label
                    htmlFor="navbar"
                    className="font-medium cursor-pointer"
                  >
                    Show Navigation Component
                  </label>
                </div>
                {showNavbar && (
                  <div>
                    <button
                      onClick={handleSaveNav}
                      className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                    >
                      Save in Layout
                    </button>
                  </div>
                )}
              </div>

              {/* Navbar Color and Style Selection */}
              {showNavbar && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Navbar Brand and Style */}
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <label className="font-medium text-gray-700">
                        Brand Text:
                      </label>
                      <input
                        type="text"
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        value={brandText}
                        onChange={(e) => setBrandText(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="font-medium text-gray-700">
                        Navbar Style:
                      </label>
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
                        <span className="ml-3 text-gray-500">
                          {navbarColor}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="font-medium text-gray-700">
                        Text Color:
                      </label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                          value={navbarTextColor}
                          onChange={(e) => setNavbarTextColor(e.target.value)}
                        />
                        <span className="ml-3 text-gray-500">
                          {navbarTextColor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Banner Configuration Panel */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Banner Settings
              </h2>

              {/* Banner Toggle */}
              <div className="flex items-center mb-6 pb-4 border-b border-gray-100 gap-4">
                <div className="flex items-center gap-1">
                  <input
                    id="banner"
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 mr-1"
                    checked={showBanner}
                    onChange={() => setShowBanner(!showBanner)}
                  />
                  <label
                    htmlFor="banner"
                    className="font-medium cursor-pointer"
                  >
                    Show Banner Component
                  </label>
                </div>
                {showBanner && (
                  <div>
                    <button
                      onClick={handleSaveBanner}
                      className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                    >
                      Save in Layout
                    </button>
                  </div>
                )}
              </div>

              {/* Banner Content and Style Selection */}
              {showBanner && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Banner Content */}
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <label className="font-medium text-gray-700">
                        Banner Heading:
                      </label>
                      <input
                        type="text"
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        value={bannerHeading}
                        onChange={(e) => setBannerHeading(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="font-medium text-gray-700">
                        Banner Content:
                      </label>
                      <textarea
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        value={bannerContent}
                        onChange={(e) => setBannerContent(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="font-medium text-gray-700">
                        Show Banner Image:
                      </label>
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={showBannerImage}
                        onChange={() => setShowBannerImage(!showBannerImage)}
                      />
                    </div>

                    {showBannerImage && (
                      <div className="flex flex-col space-y-2">
                        <label className="font-medium text-gray-700">
                          Banner Image URL:
                        </label>
                        <input
                          type="text"
                          className="px-3 py-2 border border-gray-300 rounded-md"
                          value={bannerImageUrl}
                          onChange={(e) => setBannerImageUrl(e.target.value)}
                        />
                      </div>
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
                          value={bannerBackgroundColor}
                          onChange={(e) =>
                            setBannerBackgroundColor(e.target.value)
                          }
                        />
                        <span className="ml-3 text-gray-500">
                          {bannerBackgroundColor}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="font-medium text-gray-700">
                        Text Color:
                      </label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                          value={bannerTextColor}
                          onChange={(e) => setBannerTextColor(e.target.value)}
                        />
                        <span className="ml-3 text-gray-500">
                          {bannerTextColor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Features Configuration */}

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className=" mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-6">
                  Features Section
                </h2>
                {/* Features Toggle */}
                <div className="flex items-center  mb-6 pb-4 border-b border-gray-100 gap-4">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 mr-1"
                      checked={showFeatures}
                      onChange={(e) => setShowFeatures(e.target.checked)}
                    />
                    <label className="font-medium">Show Section</label>
                  </div>
                  {showFeatures && (
                    <div>
                      <button
                        onClick={handleSaveFeatures}
                        className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                      >
                        Save in Layout
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {showFeatures && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Heading
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={featuresHeading}
                      onChange={(e) => setFeaturesHeading(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subheading
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={featuresSubheading}
                      onChange={(e) => setFeaturesSubheading(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Background Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          className="w-10 h-10 rounded cursor-pointer"
                          value={featuresBackgroundColor}
                          onChange={(e) =>
                            setFeaturesBackgroundColor(e.target.value)
                          }
                        />
                        <span className="text-sm">
                          {featuresBackgroundColor}
                        </span>
                      </div>
                    </div>

                    {/* New heading text color control */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Heading Text Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          className="w-10 h-10 rounded cursor-pointer"
                          value={headingTextColor}
                          onChange={(e) => setHeadingTextColor(e.target.value)}
                        />
                        <span className="text-sm">{headingTextColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* New row for subheading and feature item text colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Subheading Text Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          className="w-10 h-10 rounded cursor-pointer"
                          value={subheadingTextColor}
                          onChange={(e) =>
                            setSubheadingTextColor(e.target.value)
                          }
                        />
                        <span className="text-sm">{subheadingTextColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Feature Item Text Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          className="w-10 h-10 rounded cursor-pointer"
                          value={featureItemTextColor}
                          onChange={(e) =>
                            setFeatureItemTextColor(e.target.value)
                          }
                        />
                        <span className="text-sm">{featureItemTextColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Animation Style Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Animation Style
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-md"
                      value={animationStyle}
                      onChange={(e) =>
                        setAnimationStyle(
                          e.target.value as
                            | "fade"
                            | "scale"
                            | "slide"
                            | "bounce"
                            | "none"
                        )
                      }
                    >
                      <option value="fade">Fade</option>
                      <option value="scale">Scale</option>
                      <option value="slide">Slide</option>
                      <option value="bounce">Bounce</option>
                      <option value="none">None</option>
                    </select>
                  </div>

                  {/* Default Card Styles Section */}
                  <div className="border-t pt-4">
                    <h3 className="text-md font-medium mb-3">
                      Default Card Styles
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Card Background
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            className="w-8 h-8 rounded cursor-pointer"
                            value={cardDefaultBgColor}
                            onChange={(e) =>
                              setCardDefaultBgColor(e.target.value)
                            }
                          />
                          <span className="text-xs">{cardDefaultBgColor}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Card Border
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            className="w-8 h-8 rounded cursor-pointer"
                            value={cardDefaultBorderColor}
                            onChange={(e) =>
                              setCardDefaultBorderColor(e.target.value)
                            }
                          />
                          <span className="text-xs">
                            {cardDefaultBorderColor}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Add UI elements to use the setters */}
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Border Style
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded-md"
                          value={cardDefaultBorderStyle}
                          onChange={handleBorderStyleChange}
                        >
                          <option value="solid">Solid</option>
                          <option value="dashed">Dashed</option>
                          <option value="dotted">Dotted</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Border Width
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded-md"
                          value={cardDefaultBorderWidth}
                          onChange={handleBorderWidthChange}
                        >
                          <option value="0px">None</option>
                          <option value="1px">Thin (1px)</option>
                          <option value="2px">Medium (2px)</option>
                          <option value="4px">Thick (4px)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-2">
                        Border Radius
                      </label>
                      <select
                        className="w-full px-3 py-2 border rounded-md"
                        value={cardDefaultBorderRadius}
                        onChange={handleBorderRadiusChange}
                      >
                        <option value="0">None</option>
                        <option value="0.25rem">Small (0.25rem)</option>
                        <option value="0.5rem">Medium (0.5rem)</option>
                        <option value="1rem">Large (1rem)</option>
                        <option value="9999px">Full</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Icon Color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            className="w-8 h-8 rounded cursor-pointer"
                            value={iconDefaultColor}
                            onChange={(e) =>
                              setIconDefaultColor(e.target.value)
                            }
                          />
                          <span className="text-xs">{iconDefaultColor}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Icon Background
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            className="w-8 h-8 rounded cursor-pointer"
                            value={iconDefaultBgColor}
                            onChange={(e) =>
                              setIconDefaultBgColor(e.target.value)
                            }
                          />
                          <span className="text-xs">{iconDefaultBgColor}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="cursor-pointer w-full mt-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                      onClick={applyDefaultStyles}
                    >
                      Apply Default Styles to All Cards
                    </button>
                  </div>

                  {/* Feature Items */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Feature Items
                    </label>
                    <div className="space-y-4 max-h-64 overflow-y-auto p-2">
                      {features.map((feature, index) => (
                        <div key={index} className="border p-3 rounded">
                          <div className="mb-2">
                            <label className="block text-xs font-medium mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              className="w-full px-2 py-1 text-sm border rounded-md"
                              value={feature.title}
                              onChange={(e) =>
                                handleFeatureUpdate(index, {
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Description
                            </label>
                            <textarea
                              className="w-full px-2 py-1 text-sm border rounded-md"
                              value={feature.description}
                              onChange={(e) =>
                                handleFeatureUpdate(index, {
                                  description: e.target.value,
                                })
                              }
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-7 shadow-xl shadow-blue-200">
            {/* Preview Section */}
            <div className="bg-white rounded-lg shadow-md  p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Preview
              </h2>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                {showNavbar && (
                  <PageNav
                    bgColor={navbarColor}
                    textColor={navbarTextColor}
                    style={navbarStyle.value} // Pass the style value
                    brandText={brandText}
                    navConfig={navConfig}
                    setNavConfig={setNavConfig}
                  />
                )}
                {showBanner && (
                  <Banner
                    showBanner={showBanner}
                    heading={bannerHeading}
                    content={bannerContent}
                    showImage={showBannerImage}
                    imageUrl={bannerImageUrl}
                    backgroundColor={bannerBackgroundColor}
                    textColor={bannerTextColor}
                  />
                )}
                {showFeatures && (
                  <Features
                    showFeatures={showFeatures}
                    heading={featuresHeading}
                    subheading={featuresSubheading}
                    features={features}
                    backgroundColor={featuresBackgroundColor}
                    headingTextColor={headingTextColor}
                    subheadingTextColor={subheadingTextColor}
                    featureItemTextColor={featureItemTextColor}
                    cardDefaultBgColor={cardDefaultBgColor}
                    cardDefaultBorderColor={cardDefaultBorderColor}
                    cardDefaultBorderStyle={cardDefaultBorderStyle}
                    cardDefaultBorderWidth={cardDefaultBorderWidth}
                    cardDefaultBorderRadius={cardDefaultBorderRadius}
                    iconDefaultColor={iconDefaultColor}
                    iconDefaultBgColor={iconDefaultBgColor}
                    animationStyle={animationStyle}
                  />
                )}
                <div className="p-8 flex justify-center items-center min-h-32 bg-gray-100 rounded">
                  <h1 className="text-2xl font-semibold text-gray-700">
                    Page Content Area
                  </h1>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 p-6">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md">
                Reset
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md">
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
