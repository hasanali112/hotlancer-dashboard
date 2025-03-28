"use client";

import { Button } from "@/components/ui/button";
import {
  resetParallaxSection,
  setParallaxSection,
} from "@/redux/features/layout/layoutSlice";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ParallaxSection = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<"upload" | "link">("upload");

  // Section configuration
  const [sectionConfig, setSectionConfig] = useState({
    image: "",
    overlayColor: "rgba(0, 0, 0, 0.5)",
    textColor: "#ffffff",
    heading: "",
    subheading: "",
    height: "400px",
    textPosition: "center", // 'center', 'left', 'right'
    textAlignment: "center", // 'center', 'left', 'right'
    parallaxEffect: true,
  });

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSectionConfig((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  // Handle adding image via URL
  const handleAddImageUrl = (url: string) => {
    if (url.trim()) {
      setSectionConfig((prev) => ({
        ...prev,
        image: url,
      }));
    }
  };

  // Handle text change
  const handleTextChange = (field: "heading" | "subheading", value: string) => {
    setSectionConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle overlay color change
  const handleOverlayColorChange = (color: string, opacity: number) => {
    const rgb = color.startsWith("#")
      ? hexToRgb(color)
      : color.startsWith("rgb")
      ? color
      : "rgb(0, 0, 0)";
    setSectionConfig((prev) => ({
      ...prev,
      overlayColor: rgb.replace(")", `, ${opacity})`).replace("rgb", "rgba"),
    }));
  };

  // Helper function to convert hex to rgb
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Save configuration to Redux
  const handleSaveSection = () => {
    dispatch(setParallaxSection(sectionConfig));
  };

  // Reset configuration
  const handleResetSection = () => {
    setSectionConfig({
      image: "",
      overlayColor: "rgba(0, 0, 0, 0.5)",
      textColor: "#ffffff",
      heading: "",
      subheading: "",
      height: "400px",
      textPosition: "center",
      textAlignment: "center",
      parallaxEffect: true,
    });
    dispatch(resetParallaxSection());
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Parallax Section Configuration
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
        {/* Image Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Background Image
          </h3>

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
              Upload File
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

          {/* Image Preview */}
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Image Preview</h4>
            {sectionConfig.image ? (
              <div className="relative">
                <Image
                  src={sectionConfig.image}
                  alt="Background preview"
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                  Background image will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Text and Style Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Content & Style
          </h3>

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
              <label className="block text-gray-700 mb-1">Section Height</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={sectionConfig.height}
                onChange={(e) =>
                  setSectionConfig((prev) => ({
                    ...prev,
                    height: e.target.value,
                  }))
                }
              >
                <option value="300px">Small (300px)</option>
                <option value="400px">Medium (400px)</option>
                <option value="500px">Large (500px)</option>
                <option value="600px">Extra Large (600px)</option>
                <option value="100vh">Full Height (100vh)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">
                  Text Position
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={sectionConfig.textPosition}
                  onChange={(e) =>
                    setSectionConfig((prev) => ({
                      ...prev,
                      textPosition: e.target.value,
                    }))
                  }
                >
                  <option value="center">Center</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Text Alignment
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={sectionConfig.textAlignment}
                  onChange={(e) =>
                    setSectionConfig((prev) => ({
                      ...prev,
                      textAlignment: e.target.value,
                    }))
                  }
                >
                  <option value="center">Center</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">
                  Overlay Color
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    className="w-10 h-10 rounded cursor-pointer"
                    value={
                      sectionConfig.overlayColor.includes("rgba")
                        ? rgbToHex(sectionConfig.overlayColor)
                        : sectionConfig.overlayColor
                    }
                    onChange={(e) =>
                      handleOverlayColorChange(
                        e.target.value,
                        parseFloat(
                          sectionConfig.overlayColor.split(",")[3]?.trim() ||
                            "0.5"
                        )
                      )
                    }
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={
                      sectionConfig.overlayColor
                        .split(",")[3]
                        ?.trim()
                        .replace(")", "") || "0.5"
                    }
                    onChange={(e) =>
                      handleOverlayColorChange(
                        sectionConfig.overlayColor.includes("rgba")
                          ? rgbToHex(sectionConfig.overlayColor)
                          : sectionConfig.overlayColor,
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full"
                  />
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

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sectionConfig.parallaxEffect}
                  onChange={(e) =>
                    setSectionConfig((prev) => ({
                      ...prev,
                      parallaxEffect: e.target.checked,
                    }))
                  }
                />
                Enable Parallax Effect
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <hr className="my-6 border border-gray-400 border-dashed" />
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Preview</h3>
      <div className="border border-dashed border-gray-400 rounded-lg overflow-hidden">
        <div
          className={`relative flex items-center justify-${sectionConfig.textPosition} bg-cover bg-center bg-fixed`}
          style={{
            height: sectionConfig.height,
            backgroundImage: sectionConfig.image
              ? `url(${sectionConfig.image})`
              : "none",
            backgroundColor: !sectionConfig.image ? "#f0f0f0" : undefined,
          }}
        >
          {sectionConfig.image && (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: sectionConfig.overlayColor }}
            ></div>
          )}
          <div
            className={`relative z-10 p-8 text-${sectionConfig.textAlignment}`}
            style={{ color: sectionConfig.textColor, maxWidth: "800px" }}
          >
            {sectionConfig.heading ? (
              <h2 className="text-4xl font-bold mb-4">
                {sectionConfig.heading}
              </h2>
            ) : (
              <div className="h-10 bg-gray-200 rounded mb-4 w-3/4 mx-auto"></div>
            )}

            {sectionConfig.subheading ? (
              <h3 className="text-2xl font-semibold">
                {sectionConfig.subheading}
              </h3>
            ) : (
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert RGB to Hex
function rgbToHex(rgb: string) {
  const parts =
    rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/) || [];
  const r = parseInt(parts[1]);
  const g = parseInt(parts[2]);
  const b = parseInt(parts[3]);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export default ParallaxSection;
