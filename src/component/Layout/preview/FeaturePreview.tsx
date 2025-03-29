/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface Feature {
  alignItems?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  borderWidth?: string;
  description?: string;
  descriptionSize?: string;
  descriptionWeight?: string;
  flexDirection?: string;
  fontFamily?: string;
  gap?: string;
  icon?: string;
  justifyContent?: string;
  margin?: string;
  padding?: string;
  textColor?: string;
  title?: string;
  titleSize?: string;
  titleWeight?: string;
}

const FeaturesPreview = ({
  featuresComponent,
}: {
  featuresComponent: Feature[];
}) => {
  if (!featuresComponent || featuresComponent.length === 0) {
    return <div className="text-center p-4">No features to display</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {featuresComponent.length > 0 &&
        featuresComponent.map((feature, index) => {
          const {
            alignItems,
            backgroundColor,
            borderColor,
            borderRadius,
            borderWidth,
            description,
            descriptionSize,
            descriptionWeight,
            flexDirection,
            fontFamily,
            gap,
            icon,
            justifyContent,
            margin,
            padding,
            textColor,
            title,
            titleSize,
            titleWeight,
          } = feature;

          return (
            <div key={index || title} className={margin}>
              <div
                className={`flex ${flexDirection} ${gap} ${padding} ${borderWidth} ${borderRadius} ${fontFamily} ${alignItems} ${justifyContent} h-full`}
                style={{
                  backgroundColor,
                  borderColor,
                  color: textColor,
                }}
              >
                {icon && <div className={titleSize}>{icon}</div>}
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
