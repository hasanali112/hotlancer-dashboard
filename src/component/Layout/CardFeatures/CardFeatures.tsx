"use client";
import React, { useState } from "react";
import {
  defaultFeatures,
  defaultFeaturesProps,
} from "@/Constant/DefaultValues";
import { Feature } from "@/types/Interface";
import { useAppDispatch } from "@/redux/hook";
import { setComponent } from "@/redux/features/layout/layoutSlice";

const CardFeatures = () => {
  const dispatch = useAppDispatch();

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
  const [headingTextColor, setHeadingTextColor] = useState(
    defaultFeaturesProps.headingTextColor || "#333333"
  );
  const [subheadingTextColor, setSubheadingTextColor] = useState(
    defaultFeaturesProps.subheadingTextColor || "#666666"
  );
  const [featureItemTextColor, setFeatureItemTextColor] = useState(
    defaultFeaturesProps.featureItemTextColor || "#333333"
  );
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

  // Features Array
  const [features, setFeatures] = useState<Feature[]>(() => {
    return defaultFeatures.map((feature) => ({
      ...feature,
      cardBorderStyle: feature.cardBorderStyle as
        | "solid"
        | "dashed"
        | "dotted"
        | "none",
    }));
  });

  // Handle Feature Update
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

  // Apply Default Styles to All Features
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

  // Handle Save Features
  const handleSaveFeatures = () => {
    const featuresData = {
      showFeatures,
      heading: featuresHeading,
      subheading: featuresSubheading,
      backgroundColor: featuresBackgroundColor,
      headingTextColor,
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Features Section
        </h2>
        {/* Features Toggle */}
        <div className="flex items-center mb-6 pb-4 border-b border-gray-100 gap-4">
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
          {/* Heading */}
          <div>
            <label className="block text-sm font-medium mb-2">Heading</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={featuresHeading}
              onChange={(e) => setFeaturesHeading(e.target.value)}
            />
          </div>

          {/* Subheading */}
          <div>
            <label className="block text-sm font-medium mb-2">Subheading</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={featuresSubheading}
              onChange={(e) => setFeaturesSubheading(e.target.value)}
            />
          </div>

          {/* Background Color */}
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
                  onChange={(e) => setFeaturesBackgroundColor(e.target.value)}
                />
                <span className="text-sm">{featuresBackgroundColor}</span>
              </div>
            </div>

            {/* Heading Text Color */}
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

          {/* Subheading and Feature Item Text Colors */}
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
                  onChange={(e) => setSubheadingTextColor(e.target.value)}
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
                  onChange={(e) => setFeatureItemTextColor(e.target.value)}
                />
                <span className="text-sm">{featureItemTextColor}</span>
              </div>
            </div>
          </div>

          {/* Animation Style */}
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

          {/* Default Card Styles */}
          <div className="border-t pt-4">
            <h3 className="text-md font-medium mb-3">Default Card Styles</h3>
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
                    onChange={(e) => setCardDefaultBgColor(e.target.value)}
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
                    onChange={(e) => setCardDefaultBorderColor(e.target.value)}
                  />
                  <span className="text-xs">{cardDefaultBorderColor}</span>
                </div>
              </div>
            </div>

            {/* Border Style and Width */}
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Border Style
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={cardDefaultBorderStyle}
                  onChange={(e) =>
                    setCardDefaultBorderStyle(
                      e.target.value as "solid" | "dashed" | "dotted" | "none"
                    )
                  }
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
                  onChange={(e) => setCardDefaultBorderWidth(e.target.value)}
                >
                  <option value="0px">None</option>
                  <option value="1px">Thin (1px)</option>
                  <option value="2px">Medium (2px)</option>
                  <option value="4px">Thick (4px)</option>
                </select>
              </div>
            </div>

            {/* Border Radius */}
            <div className="mt-3">
              <label className="block text-sm font-medium mb-2">
                Border Radius
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={cardDefaultBorderRadius}
                onChange={(e) => setCardDefaultBorderRadius(e.target.value)}
              >
                <option value="0">None</option>
                <option value="0.25rem">Small (0.25rem)</option>
                <option value="0.5rem">Medium (0.5rem)</option>
                <option value="1rem">Large (1rem)</option>
                <option value="9999px">Full</option>
              </select>
            </div>

            {/* Icon Colors */}
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
                    onChange={(e) => setIconDefaultColor(e.target.value)}
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
                    onChange={(e) => setIconDefaultBgColor(e.target.value)}
                  />
                  <span className="text-xs">{iconDefaultBgColor}</span>
                </div>
              </div>
            </div>

            {/* Apply Default Styles Button */}
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
  );
};

export default CardFeatures;
