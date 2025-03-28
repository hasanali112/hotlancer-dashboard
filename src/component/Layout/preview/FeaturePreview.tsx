/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

const FeaturesPreview = ({
  featuresComponent,
}: {
  featuresComponent: any[];
}) => {
  // If no features provided, return null or a message
  if (!featuresComponent || featuresComponent.length === 0) {
    return <div className="text-center p-4">No features to display</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {featuresComponent.map((feature, index) => {
        // Destructure with default values for each feature
        const {
          alignItems = "items-center",
          backgroundColor = "#ffffff",
          borderColor = "#e2e8f0",
          borderRadius = "rounded",
          borderWidth = "border",
          description = "Feature description goes here.",
          descriptionSize = "text-base",
          descriptionWeight = "font-normal",
          flexDirection = "flex-col",
          fontFamily = "font-sans",
          gap = "gap-4",
          icon = "🌟",
          justifyContent = "justify-center",
          margin = "m-2",
          padding = "p-4",
          textColor = "#333333",
          title = "Feature Title",
          titleSize = "text-xl",
          titleWeight = "font-bold",
          id = `feature-${index}`, // Add a fallback ID
        } = feature || {};

        return (
          <div key={id} className={`${margin}`}>
            <div
              className={`flex ${flexDirection} ${gap} ${padding} ${borderWidth} ${borderRadius} ${fontFamily} ${alignItems} ${justifyContent} h-full`}
              style={{
                backgroundColor,
                borderColor,
                color: textColor,
              }}
            >
              {icon && <div className={`${titleSize}`}>{icon}</div>}
              <div className={`text-center ${gap}`}>
                {title && (
                  <h3 className={`${titleSize} ${titleWeight}`}>{title}</h3>
                )}
                {description && (
                  <p className={`${descriptionSize} ${descriptionWeight}`}>
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesPreview;
