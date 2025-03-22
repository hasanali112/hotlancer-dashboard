"use client";
import React, { useState, useEffect } from "react";
import PageNav from "@/component/Layout/PageNav";
import { useAppDispatch } from "@/redux/hook";
import { setComponent } from "@/redux/features/layoutSlice";

const Home = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [navbarColor, setNavbarColor] = useState("#ffffff");
  const [navbarTextColor, setNavbarTextColor] = useState("#333333");
  const [navbarStyle, setNavbarStyle] = useState({
    value: "default", // Style type (default, minimal, extended)
    padding: "py-4", // Padding value based on style
  });
  const [brandText, setBrandText] = useState("My Site");
  const [navConfig, setNavConfig] = useState({
    brand: brandText || "My Site",
    items: [
      { label: "Home", url: "/" },
      { label: "About", url: "/about" },
      { label: "Services", url: "/services" },
      { label: "Contact", url: "/contact" },
    ],
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    setNavConfig((prevConfig) => ({
      ...prevConfig,
      brand: brandText,
    }));
  }, [brandText]);

  const handleSaveNav = () => {
    const navbarData = {
      navBgColor: navbarColor,
      navTextColor: navbarTextColor,
      navStyle: navbarStyle, // Include both value and padding
      brandText: brandText,
      navConfig: navConfig.items,
    };

    if (showNavbar) {
      dispatch(setComponent(navbarData));
    }
  };

  // Update navbarStyle when the style value changes
  const handleStyleChange = (value: string) => {
    let padding;
    switch (value) {
      case "minimal":
        padding = "py-2";
        break;
      case "extended":
        padding = "py-6";
        break;
      default:
        padding = "py-4";
    }
    setNavbarStyle({ value, padding });
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 min-h-screen bg-gray-50">
      <div className="py-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Layout Configuration
        </h1>
        <p className="text-gray-600 mt-2">
          Customize your page navigation and layout
        </p>
        <hr className="my-6 border-gray-200" />

        {/* Configuration Panel */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Navigation Settings
          </h2>

          {/* Navbar Toggle */}
          <div className="flex items-center mb-6 pb-4 border-b border-gray-100 gap-4">
            <div>
              <input
                id="navbar"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 mr-3"
                checked={showNavbar}
                onChange={() => setShowNavbar(!showNavbar)}
              />
              <label htmlFor="navbar" className="font-medium cursor-pointer">
                Show Navigation Component
              </label>
            </div>
            {showNavbar && (
              <div>
                <button
                  onClick={handleSaveNav}
                  className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer "
                >
                  Save in Layout
                </button>
              </div>
            )}
          </div>

          {/* Color and Style Selection */}
          {showNavbar && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700">
                    Brand Text:
                  </label>
                  <input
                    type="text"
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={brandText}
                    onChange={(e) => setBrandText(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700">
                    Navbar Style:
                  </label>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={navbarStyle.value}
                    onChange={(e) => handleStyleChange(e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="minimal">Minimal</option>
                    <option value="extended">Extended</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700">
                    Background Color:
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                      value={navbarColor}
                      onChange={(e) => setNavbarColor(e.target.value)}
                    />
                    <span className="ml-3 text-gray-500">{navbarColor}</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700">
                    Text Color:
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                      value={navbarTextColor}
                      onChange={(e) => setNavbarTextColor(e.target.value)}
                    />
                    <span className="ml-3 text-gray-500">
                      {navbarTextColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Preview</h2>
          <div className="border border-gray-200 rounded-md overflow-hidden">
            {showNavbar && (
              <PageNav
                bgColor={navbarColor}
                textColor={navbarTextColor}
                style={navbarStyle.value} // Pass the style value
                brandText={brandText}
                navConfig={navConfig}
                setNavConfig={setNavConfig}
              />
            )}
            <div className="p-8 flex justify-center items-center min-h-32 bg-gray-100 rounded">
              <h1 className="text-2xl font-semibold text-gray-700">
                Page Content Area
              </h1>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md">
            Reset
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
