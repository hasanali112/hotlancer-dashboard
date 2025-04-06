/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

const PagNavPreview = ({ navConfig, navbarColor, navbarTextColor }: any) => {
  return (
    <div>
      <div className="mt-8 bg-white rounded-lg shadow-sm ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Navbar Preview
          </h3>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <nav
            className={`${navConfig.baseClasses} ${navConfig.display} ${navConfig.flexDirection} ${navConfig.justifyContent} ${navConfig.alignItems} ${navConfig.gap} ${navConfig.padding}`}
            style={{ backgroundColor: navbarColor, color: navbarTextColor }}
          >
            {navConfig.brandType === "text" ? (
              <div
                className={`${navConfig.brandTextSize} ${navConfig.brandWeight}`}
              >
                {navConfig.brand}
              </div>
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

            {/* Desktop nav items */}
            <div
              className={`${navConfig.navItemContainerClasses} items-center ${navConfig.gap}`}
            >
              {navConfig.items.map(
                (item: { label: string; url: string }, index: number) => (
                  <a
                    key={index}
                    href={item.url}
                    className={`${navConfig.textSize} ${navConfig.textHover} ${navConfig.textTransition}`}
                    style={{ color: navbarTextColor }}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PagNavPreview;
