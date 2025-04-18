/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useState } from "react";
import NavPreview from "./NavPreview";
import BanPreview from "./BanPreview";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import FeaturesPreview from "./FeaturePreview";
import { useCreateLayoutMutation } from "@/redux/features/layout/layout.api";
import DescriptiveSectionPreview from "./DescriptiveSectionPreview";
import ParallaxSectionPreview from "./ParallaxSectionPreview";
import FormSectionPreview from "./FormSectionPreview";
import FaqSectionPreview from "./FaqSectionPreview";
import FooterSectionPreview from "./FooterSectionPreview";
import { resetFull } from "@/redux/features/layout/layoutSlice";

const Preview = () => {
  const [layoutNames, setLayoutNames] = useState("");
  const {
    navComponent,
    bannerComponent,
    featuresComponent,
    descriptiveSection,
    parallaxSection,
    formSection,
    faqSection,
    footerSection,
  } = useAppSelector((state) => state.layout as any);
  const [createLayout, { isLoading }] = useCreateLayoutMutation();
  const dispatch = useAppDispatch();

  const handleComponent = async () => {
    const data = {
      layoutName: layoutNames,
      ...(navComponent && { navComponent }),
      ...(bannerComponent && { bannerComponent }),
      ...(featuresComponent && { featuresComponent }),
      ...(descriptiveSection && { descriptiveSection }),
      ...(parallaxSection && { parallaxSection }),
      ...(formSection && { formSection }),
      ...(faqSection && { faqSection }),
      ...(footerSection && { footerSection }),
    };
    try {
      const response = await createLayout(data).unwrap();
      if (response?.success === true) {
        toast.success(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check if any component exists
  const hasAnyComponent =
    navComponent ||
    bannerComponent ||
    featuresComponent ||
    descriptiveSection ||
    parallaxSection;

  return (
    <div className="shadow-lg shadow-blue-200 rounded-lg w-full">
      <div className="bg-white p-6 mb-6">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Preview</h2>
          <div className="mb-4 space-y-3">
            <label htmlFor="layoutName" className="block text-gray-700">
              Layout Name*
            </label>
            <input
              type="text"
              id="layoutName"
              name="layoutName"
              placeholder="Layout Name"
              className="border border-gray-300 rounded w-[400px] h-[40px] px-4"
              onChange={(e) => setLayoutNames(e.target.value)}
              value={layoutNames}
            />
          </div>
        </div>
        <div className="border border-gray-200 rounded-md">
          <div className="p-3 flex flex-col gap-10 justify-center items-center min-h-32 bg-gray-100 rounded">
            {/* Navbar */}
            {navComponent && <NavPreview navComponent={navComponent} />}
            {bannerComponent && (
              <BanPreview bannerComponent={bannerComponent} />
            )}
            {featuresComponent && (
              <FeaturesPreview featuresComponent={featuresComponent} />
            )}
            {descriptiveSection && (
              <DescriptiveSectionPreview
                descriptiveSection={descriptiveSection}
              />
            )}
            {parallaxSection && (
              <ParallaxSectionPreview parallaxSection={parallaxSection} />
            )}
            {formSection && <FormSectionPreview formSection={formSection} />}

            {faqSection && <FaqSectionPreview faqSection={faqSection} />}
            {footerSection && (
              <FooterSectionPreview footerSection={footerSection} />
            )}
          </div>
          {/* Only show Page Content Area if no components exist */}
          {!hasAnyComponent && (
            <div className="p-8 flex justify-center items-center min-h-32 bg-gray-100 rounded">
              <h1 className="text-2xl font-semibold text-gray-700">
                Page Content Area
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 p-6 bg-gray-50 border-t border-gray-200">
        <Button
          onClick={() => dispatch(resetFull())}
          className="bg-white text-gray-700 hover:bg-gray-100 border border-gray-500 rounded"
        >
          Reset
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  disabled={layoutNames === ""}
                  onClick={handleComponent}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-[130px] cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  ) : (
                    "Save Layout"
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            {layoutNames === "" && (
              <TooltipContent side="top">
                <p>Please provide the layout name</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Preview;
