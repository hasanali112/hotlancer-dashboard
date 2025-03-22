/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';

const PageNav = ({ bgColor = "#ffffff", textColor = "#333333", style = "default", brandText }:any) => {
  // Default configuration
  const [navConfig, setNavConfig] = useState({
    brand: brandText || "My Site", // Provide a default value in case brandText is undefined
    items: [
      { label: "Home", url: "/" },
      { label: "About", url: "/about" },
      { label: "Services", url: "/services" },
      { label: "Contact", url: "/contact" }
    ]
  });
  
  // Update navConfig when brandText prop changes
  useEffect(() => {
    setNavConfig(prevConfig => ({
      ...prevConfig,
      brand: brandText
    }));
  }, [brandText]);
  
  
  
  // Handle saving the updated configuration

  // Determine padding based on style
  const getPadding = () => {
    switch(style) {
      case 'minimal': return 'py-2';
      case 'extended': return 'py-6';
      default: return 'py-4';
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
          <div key={index}>
           {item.label}
          </div>
        ))}
      </div>
      
    
    </nav>
  );
};

export default PageNav;