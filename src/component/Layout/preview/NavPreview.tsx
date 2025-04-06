/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

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
        {/* Brand (Image or Text) */}
        {navComponent.brandType === "image" ? (
          navComponent.brandImage ? (
            <Image
              src={navComponent.brandImage}
              alt="Brand Logo"
              width={100}
              height={100}
              className="w-10"
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

        {/* Desktop Nav Items */}
        <ul
          className={`${navComponent.classes?.navItemContainerClasses} ${navComponent.classes?.display} ${navComponent.classes?.flexDirection} ${navComponent.classes?.gap}`}
        >
          {navComponent.items?.map((item: any, index: any) => (
            <li key={index}>
              <a
                href={item.url}
                className={`${navComponent.classes?.textSize} ${navComponent.classes?.textHover} ${navComponent.classes?.textTransition}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className={navComponent.classes?.mobileMenuClasses}>
          {navComponent.mobileMenuIcon || "☰"}
        </button>
      </nav>

      {/* Mobile Navigation (hidden by default) */}
      <div className={`${navComponent.classes?.mobileMenuClasses} w-full`}>
        <nav
          style={{
            backgroundColor: navComponent.colors?.backgroundColor,
            color: navComponent.colors?.textColor,
          }}
          className={`${navComponent.classes?.display} ${navComponent.classes?.mobileFlexDirection} ${navComponent.classes?.mobileJustifyContent} ${navComponent.classes?.mobileAlignItems} ${navComponent.classes?.mobileGap} ${navComponent.classes?.mobilePadding} w-full`}
        >
          <ul
            className={`${navComponent.classes?.mobileNavItemContainerClasses} ${navComponent.classes?.gap}`}
          >
            {navComponent.items?.map((item: any, index: any) => (
              <li key={index}>
                <a
                  href={item.url}
                  className={`${navComponent.classes?.textSize} ${navComponent.classes?.textHover} ${navComponent.classes?.textTransition}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavPreview;
