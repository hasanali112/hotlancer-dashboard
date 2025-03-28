/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";
import * as Icons from "lucide-react";

const FeaturesPreview = ({ featuresComponent }: { featuresComponent: any }) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Apply animations when component mounts or updates
    cardRefs.current.forEach((card, index) => {
      if (card && featuresComponent.cards[index]) {
        const animation = featuresComponent.cards[index].animation;
        if (animation && animation.type !== "none") {
          // Reset animation to trigger it again
          card.style.animation = "none";
          // Force reflow
          void card.offsetWidth;
          // Apply new animation
          card.style.animation = `
            ${animation.type} ${animation.duration} ${animation.timing} ${animation.delay} both
          `;
        }
      }
    });
  }, [featuresComponent]);

  // Animation styles
  const getAnimationStyles = (animation: any) => {
    if (!animation || animation.type === "none") return {};

    return {
      animation: `${animation.type} ${animation.duration} ${animation.timing} ${animation.delay} both`,
      opacity: animation.type === "fade" ? 0 : 1,
      transform:
        animation.type === "slide-up"
          ? "translateY(20px)"
          : animation.type === "slide-down"
          ? "translateY(-20px)"
          : animation.type === "zoom"
          ? "scale(0.9)"
          : "none",
    };
  };

  return (
    <div
      className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
        featuresComponent.cards.length === 0 ? "" : "py-12"
      } `}
    >
      {featuresComponent.cards.map((card: any, index: number) => {
        const IconComponent = Icons[
          card.icon as keyof typeof Icons
        ] as React.ComponentType<{ size: number }>;

        const animationStyles = getAnimationStyles(card.animation);

        return (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            style={{
              backgroundColor: card.styles.card.backgroundColor,
              borderRadius: card.styles.card.borderRadius,
              borderColor: card.styles.card.borderColor,
              borderWidth: card.styles.card.borderWidth,
              boxShadow: `0 1px 3px ${card.styles.card.shadowColor}`,
              width: card.styles.card.width,
              height: card.styles.card.height,
              padding: card.styles.card.padding,
              ...animationStyles,
            }}
            className="border flex flex-col hover:shadow-md transition-shadow duration-200"
          >
            {/* Icon */}
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

            {/* Title */}
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

            {/* Description */}
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
