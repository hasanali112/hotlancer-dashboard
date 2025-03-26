/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  resetDescriptiveSection,
  setDescriptiveSection,
} from "@/redux/features/layout/layoutSlice";
import { useAppSelector } from "@/redux/hook";
import type { DescriptiveSection } from "@/types/Interface";

import Image from "next/image";
import React, { useState, useRef, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

const LAYOUT_OPTIONS = [
  { value: "image-left", label: "Image Left" },
  { value: "image-right", label: "Image Right" },
];

const DescriptiveSection = () => {
  const dispatch = useDispatch();
  const { descriptiveSection } = useAppSelector((state) => state.layout);
  const [sections, setSections] = useState<DescriptiveSection[]>(
    descriptiveSection.sections
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addNewSection = () => {
    setSections([
      ...sections,
      {
        images: [],
        heading: "New Section Heading",
        subheading: "New Subheading",
        description: "Description text goes here",
        styles: { ...descriptiveSection.sections[0].styles },
        layout: "image-left",
      },
    ]);
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const imageUrls = files.map((file) => URL.createObjectURL(file));

      setSections((prevSections) => {
        const updated = [...prevSections];
        updated[index] = {
          ...updated[index],
          images: [...updated[index].images, ...imageUrls],
        };
        return updated;
      });
    }
  };

  const removeImage = (sectionIndex: number, imageIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].images.splice(imageIndex, 1);
    setSections(updated);
  };

  const updateSection = (index: number, field: string, value: any) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const updateStyle = (
    index: number,
    element: keyof (typeof sections)[0]["styles"],
    field: string,
    value: string
  ) => {
    const updated = [...sections];
    updated[index] = {
      ...updated[index],
      styles: {
        ...updated[index].styles,
        [element]: {
          ...updated[index].styles[element],
          [field]: value,
        },
      },
    };
    setSections(updated);
  };

  const handleSave = () => {
    dispatch(setDescriptiveSection({ sections }));
  };

  const handleReset = () => {
    dispatch(resetDescriptiveSection());
    setSections(descriptiveSection.sections);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Descriptive Sections Configuration
        </h2>
        <div className="flex gap-2">
          <Button onClick={handleSave}>Save Configuration</Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {sections.map((section, index) => (
        <div key={index} className="mb-8 p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-4">Section {index + 1}</h3>

          {/* Image Upload Section */}
          <div className="mb-6">
            <label className="block mb-2">Images</label>
            {section.images.length > 0 ? (
              <div className="flex flex-wrap gap-4 mb-4">
                {section.images.map((img, imgIndex) => (
                  <div key={imgIndex} className="relative group">
                    <Image
                      src={img}
                      alt={`Preview ${imgIndex}`}
                      width={200}
                      height={200}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <button
                      onClick={() => removeImage(index, imgIndex)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-4 text-gray-500">No images uploaded yet</div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleImageUpload(e, index)}
              accept="image/*"
              multiple
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Images
            </Button>
          </div>

          {/* Layout Selection */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block mb-2">Layout</label>
              <select
                value={section.layout}
                onChange={(e) => updateSection(index, "layout", e.target.value)}
                className="w-full p-2 border rounded"
              >
                {LAYOUT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Text Content */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block mb-2">Heading</label>
              <input
                value={section.heading}
                onChange={(e) =>
                  updateSection(index, "heading", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Subheading</label>
              <input
                value={section.subheading}
                onChange={(e) =>
                  updateSection(index, "subheading", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              value={section.description}
              onChange={(e) =>
                updateSection(index, "description", e.target.value)
              }
              className="w-full p-2 border rounded min-h-[100px]"
            />
          </div>

          {/* Styling Controls */}
          <div className="space-y-4">
            <h4 className="font-medium">Styling Options</h4>

            {/* Heading Styles */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-1">Heading Color</label>
                <input
                  type="color"
                  value={section.styles.heading.color}
                  onChange={(e) =>
                    updateStyle(index, "heading", "color", e.target.value)
                  }
                  className="w-full h-10"
                />
              </div>
              {/* Add more styling controls for each element */}
            </div>
          </div>
        </div>
      ))}

      <Button onClick={addNewSection} className="w-full mt-4" variant="outline">
        Add New Section
      </Button>
    </div>
  );
};

export default DescriptiveSection;
