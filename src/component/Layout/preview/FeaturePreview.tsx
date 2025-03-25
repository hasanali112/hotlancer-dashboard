/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import * as Icons from "lucide-react";

const FeaturesPreview = ({ featuresComponent }: { featuresComponent: any }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {featuresComponent.cards.map((card: any, index: number) => {
        // Correctly type the icon component
        const IconComponent = Icons[
          card.icon as keyof typeof Icons
        ] as React.ComponentType<{ size: number }>;

        return (
          <div
            key={index}
            style={{
              backgroundColor: card.styles.card.backgroundColor,
              borderRadius: card.styles.card.borderRadius,
              borderColor: card.styles.card.borderColor,
              borderWidth: card.styles.card.borderWidth,
              boxShadow: `0 1px 3px ${card.styles.card.shadowColor}`,
              width: card.styles.card.width,
              height: card.styles.card.height,
              padding: card.styles.card.padding,
            }}
            className="border flex flex-col"
          >
            <div
              style={{
                backgroundColor: card.styles.icon.backgroundColor,
                color: card.styles.icon.color,
                padding: card.styles.icon.padding,
              }}
              className="inline-block rounded-lg mb-4 self-start"
            >
              {IconComponent && (
                <IconComponent size={parseInt(card.styles.icon.size || "24")} />
              )}
            </div>

            <h3
              style={{
                color: card.styles.title.color,
                fontSize: card.styles.title.fontSize,
                fontWeight: card.styles.title.fontWeight,
              }}
              className="mb-2"
            >
              {card.title}
            </h3>

            <p
              style={{
                color: card.styles.description.color,
                fontSize: card.styles.description.fontSize,
              }}
            >
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesPreview;
