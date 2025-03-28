"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  resetFooterSection,
  setFooterSection,
} from "@/redux/features/layout/layoutSlice";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SocialIcon } from "react-social-icons";

type FooterColumn = {
  id: string;
  title: string;
  items: {
    id: string;
    text: string;
    url?: string;
    icon?: string;
  }[];
};

type FooterConfig = {
  logo: {
    image: string;
    text: string;
    subtext: string;
  };
  columns: FooterColumn[];
  socialLinks: {
    id: string;
    platform: string;
    url: string;
  }[];
  styles: {
    bgColor: string;
    textColor: string;
    headingColor: string;
    iconColor: string;
    headingSize: string;
    textSize: string;
    padding: string;
    gap: string;
  };
};

const FooterSection = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<"upload" | "link">("upload");
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  const [footerConfig, setFooterConfig] = useState<FooterConfig>({
    logo: {
      image: "",
      text: "Your Brand",
      subtext: "Building amazing digital experiences",
    },
    columns: [
      {
        id: "col-1",
        title: "Quick Links",
        items: [
          { id: "item-1", text: "Home", url: "/" },
          { id: "item-2", text: "About", url: "/about" },
          { id: "item-3", text: "Services", url: "/services" },
        ],
      },
      {
        id: "col-2",
        title: "Services",
        items: [
          { id: "item-4", text: "Web Design", url: "/services/web-design" },
          { id: "item-5", text: "Development", url: "/services/development" },
        ],
      },
      {
        id: "col-3",
        title: "Contact",
        items: [
          {
            id: "item-6",
            text: "info@example.com",
            url: "mailto:info@example.com",
          },
          { id: "item-7", text: "+1 (555) 123-4567", url: "tel:+15551234567" },
        ],
      },
    ],
    socialLinks: [
      { id: "social-1", platform: "facebook", url: "https://facebook.com" },
      { id: "social-2", platform: "twitter", url: "https://twitter.com" },
      { id: "social-3", platform: "instagram", url: "https://instagram.com" },
    ],
    styles: {
      bgColor: "#1e293b",
      textColor: "#e2e8f0",
      headingColor: "#ffffff",
      iconColor: "#ffffff",
      headingSize: "1.125rem",
      textSize: "0.875rem",
      padding: "2rem",
      gap: "2rem",
    },
  });

  // Handle logo image upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFooterConfig((prev) => ({
        ...prev,
        logo: {
          ...prev.logo,
          image: URL.createObjectURL(file),
        },
      }));
    }
  };

  // Handle adding logo via URL
  const handleAddLogoUrl = (url: string) => {
    if (url.trim()) {
      setFooterConfig((prev) => ({
        ...prev,
        logo: {
          ...prev.logo,
          image: url,
        },
      }));
    }
  };

  // Update logo text
  const updateLogoText = (field: "text" | "subtext", value: string) => {
    setFooterConfig((prev) => ({
      ...prev,
      logo: {
        ...prev.logo,
        [field]: value,
      },
    }));
  };

  // Add new column
  const addColumn = () => {
    const newColumn: FooterColumn = {
      id: `col-${Date.now()}`,
      title: "New Column",
      items: [],
    };
    setFooterConfig((prev) => ({
      ...prev,
      columns: [...prev.columns, newColumn],
    }));
    setActiveColumn(newColumn.id);
  };

  // Remove column
  const removeColumn = (id: string) => {
    setFooterConfig((prev) => ({
      ...prev,
      columns: prev.columns.filter((col) => col.id !== id),
    }));
    if (activeColumn === id) {
      setActiveColumn(null);
    }
  };

  // Update column title
  const updateColumnTitle = (id: string, title: string) => {
    setFooterConfig((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === id ? { ...col, title } : col
      ),
    }));
  };

  // Add item to column
  const addColumnItem = (columnId: string) => {
    const newItem = {
      id: `item-${Date.now()}`,
      text: "New Item",
      url: "#",
    };
    setFooterConfig((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === columnId ? { ...col, items: [...col.items, newItem] } : col
      ),
    }));
  };

  // Remove item from column
  const removeColumnItem = (columnId: string, itemId: string) => {
    setFooterConfig((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              items: col.items.filter((item) => item.id !== itemId),
            }
          : col
      ),
    }));
  };

  // Update column item
  const updateColumnItem = (
    columnId: string,
    itemId: string,
    field: "text" | "url",
    value: string
  ) => {
    setFooterConfig((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              items: col.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
              ),
            }
          : col
      ),
    }));
  };

  // Add social link
  const addSocialLink = () => {
    const newLink = {
      id: `social-${Date.now()}`,
      platform: "facebook",
      url: "https://facebook.com",
    };
    setFooterConfig((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newLink],
    }));
  };

  // Remove social link
  const removeSocialLink = (id: string) => {
    setFooterConfig((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((link) => link.id !== id),
    }));
  };

  // Update social link
  const updateSocialLink = (
    id: string,
    field: "platform" | "url",
    value: string
  ) => {
    setFooterConfig((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    }));
  };

  // Update style
  const updateStyle = (property: string, value: string) => {
    setFooterConfig((prev) => ({
      ...prev,
      styles: {
        ...prev.styles,
        [property]: value,
      },
    }));
  };

  // Save configuration to Redux
  const handleSaveFooter = () => {
    dispatch(setFooterSection(footerConfig));
  };

  // Reset configuration
  const handleResetFooter = () => {
    setFooterConfig({
      logo: {
        image: "",
        text: "Your Brand",
        subtext: "Building amazing digital experiences",
      },
      columns: [
        {
          id: "col-1",
          title: "Quick Links",
          items: [
            { id: "item-1", text: "Home", url: "/" },
            { id: "item-2", text: "About", url: "/about" },
            { id: "item-3", text: "Services", url: "/services" },
          ],
        },
        {
          id: "col-2",
          title: "Services",
          items: [
            { id: "item-4", text: "Web Design", url: "/services/web-design" },
            { id: "item-5", text: "Development", url: "/services/development" },
          ],
        },
        {
          id: "col-3",
          title: "Contact",
          items: [
            {
              id: "item-6",
              text: "info@example.com",
              url: "mailto:info@example.com",
            },
            {
              id: "item-7",
              text: "+1 (555) 123-4567",
              url: "tel:+15551234567",
            },
          ],
        },
      ],
      socialLinks: [
        { id: "social-1", platform: "facebook", url: "https://facebook.com" },
        { id: "social-2", platform: "twitter", url: "https://twitter.com" },
        { id: "social-3", platform: "instagram", url: "https://instagram.com" },
      ],
      styles: {
        bgColor: "#1e293b",
        textColor: "#e2e8f0",
        headingColor: "#ffffff",
        iconColor: "#ffffff",
        headingSize: "1.125rem",
        textSize: "0.875rem",
        padding: "2rem",
        gap: "2rem",
      },
    });
    dispatch(resetFooterSection());
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Footer Configuration
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={handleSaveFooter}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Save in Layout
          </Button>
          <Button
            onClick={handleResetFooter}
            className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-200 cursor-pointer border border-blue-500"
          >
            Reset
          </Button>
        </div>
      </div>
      <hr className="my-4 border border-gray-400 border-dashed" />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* Logo and Branding */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Branding</h3>

          {/* Logo Upload */}
          <div className="space-y-4">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-4 py-2 ${
                  activeTab === "upload"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("upload")}
              >
                Upload Logo
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
                    onChange={handleLogoUpload}
                    className="w-full"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter logo URL"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddLogoUrl(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={(e) => {
                      const input = e.currentTarget
                        .previousElementSibling as HTMLInputElement;
                      handleAddLogoUrl(input.value);
                      input.value = "";
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {/* Logo Preview */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">Logo Preview</h4>
              {footerConfig.logo.image ? (
                <div className="flex items-center gap-4">
                  <Image
                    src={footerConfig.logo.image}
                    alt="Logo preview"
                    width={100}
                    height={100}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500">Logo will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Brand Text */}
          <div className="space-y-3">
            <div>
              <Label className="mb-2">Brand Text</Label>
              <Input
                type="text"
                value={footerConfig.logo.text}
                onChange={(e) => updateLogoText("text", e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2">Subtext</Label>
              <Input
                type="text"
                value={footerConfig.logo.subtext}
                onChange={(e) => updateLogoText("subtext", e.target.value)}
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Social Links</h4>
            <div className="space-y-3">
              {footerConfig.socialLinks.map((link) => (
                <div key={link.id} className="flex gap-2 items-center">
                  <select
                    className="flex-1 px-2 py-1 border rounded text-sm"
                    value={link.platform}
                    onChange={(e) =>
                      updateSocialLink(link.id, "platform", e.target.value)
                    }
                  >
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                    <option value="github">GitHub</option>
                  </select>
                  <Input
                    type="text"
                    value={link.url}
                    onChange={(e) =>
                      updateSocialLink(link.id, "url", e.target.value)
                    }
                    className="flex-2"
                  />
                  <button
                    onClick={() => removeSocialLink(link.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addSocialLink}
                className="mt-2"
              >
                <Plus size={14} className="mr-2" /> Add Social Link
              </Button>
            </div>
          </div>
        </div>

        {/* Columns Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">Columns</h3>

          <Button
            onClick={addColumn}
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Column
          </Button>

          {footerConfig.columns.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">No columns added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {footerConfig.columns.map((column) => (
                <div
                  key={column.id}
                  className={`border rounded-lg p-3 space-y-3 ${
                    activeColumn === column.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h4
                      className="font-medium cursor-pointer"
                      onClick={() =>
                        setActiveColumn(
                          activeColumn === column.id ? null : column.id
                        )
                      }
                    >
                      {column.title}
                    </h4>
                    <div className="flex gap-1">
                      <button
                        onClick={() => removeColumn(column.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {activeColumn === column.id && (
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-2">Column Title</Label>
                        <Input
                          type="text"
                          value={column.title}
                          onChange={(e) =>
                            updateColumnTitle(column.id, e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="mb-2">Items</Label>
                        {column.items.length === 0 ? (
                          <p className="text-sm text-gray-500">
                            No items in this column
                          </p>
                        ) : (
                          column.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-2 items-center"
                            >
                              <Input
                                type="text"
                                value={item.text}
                                onChange={(e) =>
                                  updateColumnItem(
                                    column.id,
                                    item.id,
                                    "text",
                                    e.target.value
                                  )
                                }
                                className="flex-1"
                              />
                              <Input
                                type="text"
                                value={item.url || ""}
                                onChange={(e) =>
                                  updateColumnItem(
                                    column.id,
                                    item.id,
                                    "url",
                                    e.target.value
                                  )
                                }
                                className="flex-1"
                                placeholder="URL"
                              />
                              <button
                                onClick={() =>
                                  removeColumnItem(column.id, item.id)
                                }
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addColumnItem(column.id)}
                      >
                        <Plus size={14} className="mr-2" /> Add Item
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Styles and Preview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Styles</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">Background Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={footerConfig.styles.bgColor}
                    onChange={(e) => updateStyle("bgColor", e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2">Text Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={footerConfig.styles.textColor}
                    onChange={(e) => updateStyle("textColor", e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2">Heading Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={footerConfig.styles.headingColor}
                    onChange={(e) =>
                      updateStyle("headingColor", e.target.value)
                    }
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2">Icon Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={footerConfig.styles.iconColor}
                    onChange={(e) => updateStyle("iconColor", e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2">Heading Size</Label>
                <select
                  className="w-full"
                  value={footerConfig.styles.headingSize}
                  onChange={(e) => updateStyle("headingSize", e.target.value)}
                >
                  <option value="0.875rem">Small</option>
                  <option value="1rem">Medium</option>
                  <option value="1.125rem">Large</option>
                  <option value="1.25rem">Extra Large</option>
                </select>
              </div>
              <div>
                <Label className="mb-2">Text Size</Label>
                <select
                  className="w-full"
                  value={footerConfig.styles.textSize}
                  onChange={(e) => updateStyle("textSize", e.target.value)}
                >
                  <option value="0.75rem">Small</option>
                  <option value="0.875rem">Medium</option>
                  <option value="1rem">Large</option>
                </select>
              </div>
              <div>
                <Label className="mb-2">Padding</Label>
                <select
                  className="w-full"
                  value={footerConfig.styles.padding}
                  onChange={(e) => updateStyle("padding", e.target.value)}
                >
                  <option value="1rem">Small</option>
                  <option value="1.5rem">Medium</option>
                  <option value="2rem">Large</option>
                  <option value="3rem">Extra Large</option>
                </select>
              </div>
              <div>
                <Label className="mb-2">Gap Between Columns</Label>
                <select
                  className="w-full"
                  value={footerConfig.styles.gap}
                  onChange={(e) => updateStyle("gap", e.target.value)}
                >
                  <option value="1rem">Small</option>
                  <option value="1.5rem">Medium</option>
                  <option value="2rem">Large</option>
                  <option value="3rem">Extra Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer Preview */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Footer Preview
            </h3>
            <div
              className="border border-dashed border-gray-400 rounded-lg overflow-hidden"
              style={{
                backgroundColor: footerConfig.styles.bgColor,
                color: footerConfig.styles.textColor,
              }}
            >
              <div
                className="grid grid-cols-1 md:grid-cols-4 gap-8"
                style={{
                  padding: footerConfig.styles.padding,
                  gap: footerConfig.styles.gap,
                }}
              >
                {/* Brand Column */}
                <div className="space-y-4">
                  {footerConfig.logo.image ? (
                    <Image
                      src={footerConfig.logo.image}
                      alt="Logo"
                      width={120}
                      height={60}
                      className="h-10 w-auto object-contain"
                    />
                  ) : (
                    <div className="h-10 w-32 bg-gray-300 rounded"></div>
                  )}
                  <p>{footerConfig.logo.text}</p>
                  <p className="text-sm opacity-75">
                    {footerConfig.logo.subtext}
                  </p>
                  <div className="flex gap-2">
                    {footerConfig.socialLinks.map((link) => (
                      <SocialIcon
                        key={link.id}
                        url={link.url}
                        network={link.platform}
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                        }}
                        fgColor={footerConfig.styles.iconColor}
                        bgColor="transparent"
                      />
                    ))}
                  </div>
                </div>

                {/* Other Columns */}
                {footerConfig.columns.map((column) => (
                  <div key={column.id} className="space-y-3">
                    <h4
                      className="font-semibold"
                      style={{
                        color: footerConfig.styles.headingColor,
                        fontSize: footerConfig.styles.headingSize,
                      }}
                    >
                      {column.title}
                    </h4>
                    <ul
                      className="space-y-2"
                      style={{ fontSize: footerConfig.styles.textSize }}
                    >
                      {column.items.map((item) => (
                        <li key={item.id}>
                          <a
                            href={item.url}
                            className="hover:opacity-75 transition-opacity"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
