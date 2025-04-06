/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

const NavPreview = ({ navComponent }: { navComponent: any }) => {
  return (
    <div
      style={{
        backgroundColor: navComponent.colors?.backgroundColor,
        color: navComponent.colors?.textColor,
      }}
      className={`w-full ${navComponent.classes?.baseClasses}`}
    >
      {/* Desktop Navigation */}
      <nav
        className={`${navComponent.classes?.display} ${navComponent.classes?.flexDirection} ${navComponent.classes?.justifyContent} ${navComponent.classes?.alignItems} ${navComponent.classes?.gap} ${navComponent.classes?.padding} w-full`}
      >
        {/* Brand Section */}
        <div className="flex items-center">
          {navComponent.brandType === "image" ? (
            navComponent.brandImage ? (
              <Image
                src={navComponent.brandImage}
                alt="Brand Logo"
                width={100}
                height={100}
                className="w-10 h-auto"
              />
            ) : (
              <p className="text-red-500">No image uploaded</p>
            )
          ) : (
            <div
              className={`${navComponent.classes?.brandTextSize} ${navComponent.classes?.brandWeight}`}
            >
              {navComponent.brand}
            </div>
          )}
        </div>

        {/* Navigation Content */}
        <div className="flex items-center gap-6">
          {/* Desktop Nav Items */}
          <ul
            className={`${navComponent.classes?.navItemContainerClasses} flex items-center ${navComponent.classes?.gap}`}
          >
            {navComponent.items?.map((item: any, index: number) => (
              <li key={`desktop-${index}`}>
                <a
                  href={item.url}
                  className={`${navComponent.classes?.textSize} ${navComponent.classes?.textHover} ${navComponent.classes?.textTransition} py-2`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {navComponent.buttons?.map((button: any, index: number) => (
              <Button
                key={`desktop-btn-${index}`}
                variant={button.variant}
                className={button.buttonClasses}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={navComponent.classes?.mobileMenuClasses}
          aria-label="Toggle menu"
        >
          {navComponent.mobileMenuIcon || "☰"}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div className={`${navComponent.classes?.mobileMenuClasses} w-full`}>
        <nav
          style={{
            backgroundColor: navComponent.colors?.backgroundColor,
            color: navComponent.colors?.textColor,
          }}
          className={`${navComponent.classes?.display} ${navComponent.classes?.mobileFlexDirection} ${navComponent.classes?.mobileJustifyContent} ${navComponent.classes?.mobileAlignItems} ${navComponent.classes?.mobileGap} ${navComponent.classes?.mobilePadding}`}
        >
          <ul
            className={`${navComponent.classes?.mobileNavItemContainerClasses} ${navComponent.classes?.gap}`}
          >
            {navComponent.items?.map((item: any, index: number) => (
              <li key={`mobile-${index}`}>
                <a
                  href={item.url}
                  className={`${navComponent.classes?.textSize} ${navComponent.classes?.textHover} ${navComponent.classes?.textTransition} block py-2`}
                >
                  {item.label}
                </a>
              </li>
            ))}

            {/* Mobile Buttons */}
            {navComponent.buttons?.map((button: any, index: number) => (
              <li key={`mobile-btn-${index}`} className="w-full">
                <Button
                  variant={button.variant}
                  className={`w-full ${button.buttonClasses}`}
                >
                  {button.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavPreview;
