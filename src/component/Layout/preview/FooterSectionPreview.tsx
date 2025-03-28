/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";

const FooterSectionPreview = ({ footerSection }: { footerSection: any }) => {
  if (!footerSection || Object.keys(footerSection).length === 0) {
    return null;
  }

  return (
    <div
      className="w-full"
      style={{
        backgroundColor: footerSection.styles.bgColor,
        color: footerSection.styles.textColor,
      }}
    >
      <div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"
        style={{
          padding: footerSection.styles.padding,
          gap: footerSection.styles.gap,
        }}
      >
        {/* Brand Column */}
        <div className="space-y-4">
          {footerSection.logo.image ? (
            <Image
              src={footerSection.logo.image}
              alt="Logo"
              width={120}
              height={60}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
          )}
          <p>{footerSection.logo.text}</p>
          <p className="text-sm opacity-75">{footerSection.logo.subtext}</p>
          <div className="flex gap-2">
            {footerSection.socialLinks?.map((link: any) => (
              <SocialIcon
                key={link.id}
                url={link.url}
                network={link.platform}
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
                fgColor={footerSection.styles.iconColor}
                bgColor="transparent"
              />
            ))}
          </div>
        </div>

        {/* Other Columns */}
        {footerSection.columns?.map((column: any) => (
          <div key={column.id} className="space-y-3">
            <h4
              className="font-semibold"
              style={{
                color: footerSection.styles.headingColor,
                fontSize: footerSection.styles.headingSize,
              }}
            >
              {column.title}
            </h4>
            <ul
              className="space-y-2"
              style={{ fontSize: footerSection.styles.textSize }}
            >
              {column.items?.map((item: any) => (
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
  );
};

export default FooterSectionPreview;
