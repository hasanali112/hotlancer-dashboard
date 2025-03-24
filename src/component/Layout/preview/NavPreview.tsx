/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const NavPreview = ({ navComponent }: { navComponent: any }) => {
  return (
    <div className="w-full">
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
          <div className="text-lg font-semibold">{navComponent.brand}</div>
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
    </div>
  );
};

export default NavPreview;
