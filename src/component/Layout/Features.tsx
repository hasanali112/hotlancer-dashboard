"use client";
import { defaultFeatures } from "@/Constant/DefaultValues";
import { Feature } from "@/types/Interface";
import React from "react";

interface FeaturesProps {
  showFeatures?: boolean;
  heading?: string;
  subheading?: string;
  features?: Feature[];
  backgroundColor?: string;
  headingTextColor?: string;
  subheadingTextColor?: string;
  featureItemTextColor?: string;
  cardDefaultBgColor?: string;
  cardDefaultBorderColor?: string;
  cardDefaultBorderStyle?: "solid" | "dashed" | "dotted" | "none";
  cardDefaultBorderWidth?: string;
  cardDefaultBorderRadius?: string;
  iconDefaultColor?: string;
  iconDefaultBgColor?: string;
  animationStyle?: "fade" | "scale" | "slide" | "bounce" | "none";
}

const Features = ({
  showFeatures = true,
  heading = "Our Features",
  subheading = "What makes us different",
  features = defaultFeatures,
  backgroundColor = "#ffffff",
  headingTextColor = "#333333", // New prop for heading text color
  subheadingTextColor = "#666666", // New prop for subheading text color
  featureItemTextColor = "#333333", // New prop for feature items text color
  cardDefaultBgColor = "#ffffff",
  cardDefaultBorderColor = "#e5e7eb",
  cardDefaultBorderStyle = "solid",
  cardDefaultBorderWidth = "1px",
  cardDefaultBorderRadius = "0.5rem",
  iconDefaultColor = "#3b82f6",
  iconDefaultBgColor = "#dbeafe",
  animationStyle = "scale",
}: FeaturesProps) => {
  if (!showFeatures) return null;

  // Determine animation class based on animationStyle
  const getAnimationClass = () => {
    switch (animationStyle) {
      case "fade":
        return "transition-opacity duration-300 hover:opacity-90";
      case "scale":
        return "transition-transform duration-300 hover:scale-105";
      case "slide":
        return "transition-transform duration-300 hover:translate-y-2";
      case "bounce":
        return "hover:animate-bounce";
      case "none":
      default:
        return "";
    }
  };

  return (
    <section className="py-16 px-4 md:px-8" style={{ backgroundColor }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: headingTextColor }}
          >
            {heading}
          </h2>
          <p
            className="text-lg opacity-80"
            style={{ color: subheadingTextColor }}
          >
            {subheading}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            // Use feature-specific values or fall back to default props
            const iconColor = feature.iconColor || iconDefaultColor;
            const iconBgColor = feature.iconBgColor || iconDefaultBgColor;
            const cardBgColor = feature.cardBgColor || cardDefaultBgColor;
            const cardBorderColor =
              feature.cardBorderColor || cardDefaultBorderColor;
            const cardBorderStyle =
              feature.cardBorderStyle || cardDefaultBorderStyle;
            const cardBorderWidth =
              feature.cardBorderWidth || cardDefaultBorderWidth;
            const cardBorderRadius =
              feature.cardBorderRadius || cardDefaultBorderRadius;

            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center p-6 shadow-md ${getAnimationClass()}`}
                style={{
                  backgroundColor: cardBgColor,
                  borderColor: cardBorderColor,
                  borderStyle: cardBorderStyle,
                  borderWidth: cardBorderWidth,
                  borderRadius: cardBorderRadius,
                }}
              >
                <div
                  className="mb-4 p-4 rounded-full"
                  style={{ backgroundColor: iconBgColor }}
                >
                  <Icon className="w-8 h-8" style={{ color: iconColor }} />
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: featureItemTextColor }}
                >
                  {feature.title}
                </h3>
                <p
                  className="opacity-75"
                  style={{ color: featureItemTextColor }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
