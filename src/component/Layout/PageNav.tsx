/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";

const PageNav = ({
  bgColor = "#ffffff",
  textColor = "#333333",
  style = "default",
  brandText,
  navConfig,
  setNavConfig,
}: {
  bgColor?: string;
  textColor?: string;
  style?: string;
  brandText?: string;
  navConfig: {
    brand: string;
    items: { label: string; url: string }[];
  };
  setNavConfig: (config: any) => void;
}) => {
  useEffect(() => {
    if (setNavConfig) {
      setNavConfig((prevConfig: any) => ({
        ...prevConfig,
        brand: brandText,
      }));
    }
  }, [brandText, setNavConfig]);

  const getPadding = () => {
    switch (style) {
      case "minimal":
        return "py-2";
      case "extended":
        return "py-6";
      default:
        return "py-4";
    }
  };

  return (
    <nav
      className={`w-full px-6 flex items-center justify-between ${getPadding()}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="flex items-center">
        <div className="font-bold text-xl">{navConfig.brand}</div>
      </div>

      <div className="flex items-center space-x-4">
        {navConfig.items.map((item, index) => (
          <a
            key={index}
            href={item.url}
            className="hover:text-blue-500 transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default PageNav;
