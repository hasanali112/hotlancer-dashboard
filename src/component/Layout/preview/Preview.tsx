/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import React from "react";

const Preview = () => {
  const { navComponent } = useAppSelector((state) => state.layout as any);

  console.log(navComponent);

  return (
    <div className="shadow-lg shadow-blue-200 rounded-lg w-full">
      <div className="bg-white p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Preview</h2>
        <div className="border border-gray-200 rounded-md">
          <div className="p-8 flex justify-center items-center min-h-32 bg-gray-100 rounded">
            {/* Navbar */}
            {navComponent ? (
              <nav
                style={{
                  backgroundColor: navComponent.colors?.backgroundColor,
                  color: navComponent.colors?.textColor,
                }}
                className={`flex w-full ${navComponent.navStyles?.flexDirection} ${navComponent.navStyles?.justifyContent} ${navComponent.navStyles?.alignItems} ${navComponent.navStyles?.gap} p-4 rounded-md`}
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
                  <div className="text-lg font-semibold">
                    {navComponent.brand}
                  </div>
                )}

                {/* Nav Items */}
                <ul className={`flex ${navComponent.navStyles?.gap}`}>
                  {navComponent.items?.map((item: any, index: any) => (
                    <li key={index}>
                      <a
                        href={item.url}
                        className="hover:text-blue-600 transition duration-200"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : (
              <p className="text-gray-500">
                No navbar configuration available.
              </p>
            )}
          </div>
          <div className="p-8 flex justify-center items-center min-h-32 bg-gray-100 rounded">
            <h1 className="text-2xl font-semibold text-gray-700">
              Page Content Area
            </h1>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 p-6 bg-gray-50 border-t border-gray-200">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md transition duration-200">
          Reset
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default Preview;
