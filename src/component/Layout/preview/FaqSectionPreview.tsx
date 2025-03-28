/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FaqSectionPreview = ({ faqSection }: { faqSection: any }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  if (!faqSection || Object.keys(faqSection).length === 0) {
    return null;
  }

  const toggleItem = (id: string) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div
      className={`w-full rounded-lg ${
        !faqSection || Object.keys(faqSection).length === 0 ? "" : "p-12 my-12"
      }`}
      style={{
        backgroundColor: faqSection.styles.bgColor,
        padding: faqSection.styles.padding,
        borderRadius: faqSection.styles.borderRadius,
      }}
    >
      <div className="space-y-4" style={{ gap: faqSection.styles.gap }}>
        {faqSection.items?.map((item: any) => (
          <div
            key={item.id}
            className="overflow-hidden transition-all duration-200"
            style={{
              backgroundColor: item.styles.bgColor,
              borderColor: item.styles.borderColor,
              borderWidth: "1px",
              borderRadius: "0.375rem",
            }}
          >
            <button
              className="w-full flex items-center justify-between p-4"
              onClick={() => toggleItem(item.id)}
              style={{
                color: item.styles.questionColor,
                fontSize: item.styles.questionFontSize,
              }}
            >
              <span className="text-left font-medium">{item.question}</span>
              {activeItem === item.id ? (
                <ChevronUp size={20} style={{ color: item.styles.iconColor }} />
              ) : (
                <ChevronDown
                  size={20}
                  style={{ color: item.styles.iconColor }}
                />
              )}
            </button>
            {activeItem === item.id && (
              <div
                className="p-4 pt-0"
                style={{
                  color: item.styles.answerColor,
                  fontSize: item.styles.answerFontSize,
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSectionPreview;
