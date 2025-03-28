"use client";

import { Button } from "@/components/ui/button";
import {
  resetFaqSection,
  setFaqSection,
} from "@/redux/features/layout/layoutSlice";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  styles: {
    questionColor: string;
    answerColor: string;
    bgColor: string;
    borderColor: string;
    questionFontSize: string;
    answerFontSize: string;
    iconColor: string;
  };
};

const FaqSection = () => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [faqConfig, setFaqConfig] = useState({
    items: [] as FaqItem[],
    styles: {
      bgColor: "#ffffff",
      padding: "1.5rem",
      borderRadius: "0.5rem",
      gap: "0.5rem",
    },
  });

  // Add new FAQ item
  const addFaqItem = () => {
    const newItem: FaqItem = {
      id: `faq-${Date.now()}`,
      question: "New Question",
      answer: "New Answer",
      styles: {
        questionColor: "#1a1a1a",
        answerColor: "#4a5568",
        bgColor: "#ffffff",
        borderColor: "#e2e8f0",
        questionFontSize: "1.125rem",
        answerFontSize: "1rem",
        iconColor: "#3b82f6",
      },
    };
    setFaqConfig((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
    setActiveItem(newItem.id);
  };

  // Remove FAQ item
  const removeFaqItem = (id: string) => {
    setFaqConfig((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
    if (activeItem === id) {
      setActiveItem(null);
    }
  };

  // Move FAQ item up/down
  const moveFaqItem = (id: string, direction: "up" | "down") => {
    const index = faqConfig.items.findIndex((item) => item.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === faqConfig.items.length - 1)
    ) {
      return;
    }

    const newItems = [...faqConfig.items];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newItems[index], newItems[newIndex]] = [
      newItems[newIndex],
      newItems[index],
    ];

    setFaqConfig((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  // Update FAQ item content
  const updateFaqItem = (
    id: string,
    field: "question" | "answer",
    value: string
  ) => {
    setFaqConfig((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Update FAQ item style
  const updateFaqItemStyle = (id: string, property: string, value: string) => {
    setFaqConfig((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id
          ? {
              ...item,
              styles: { ...item.styles, [property]: value },
            }
          : item
      ),
    }));
  };

  // Toggle FAQ item
  const toggleFaqItem = (id: string) => {
    setActiveItem(activeItem === id ? null : id);
  };

  // Save configuration to Redux
  const handleSaveFaq = () => {
    dispatch(setFaqSection(faqConfig));
  };

  // Reset configuration
  const handleResetFaq = () => {
    setFaqConfig({
      items: [],
      styles: {
        bgColor: "#ffffff",
        padding: "1.5rem",
        borderRadius: "0.5rem",
        gap: "0.5rem",
      },
    });
    setActiveItem(null);
    dispatch(resetFaqSection());
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          FAQ Section Configuration
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={handleSaveFaq}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Save in Layout
          </Button>
          <Button
            onClick={handleResetFaq}
            className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-200 cursor-pointer border border-blue-500"
          >
            Reset
          </Button>
        </div>
      </div>
      <hr className="my-4 border border-gray-400 border-dashed" />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* FAQ Items List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">FAQ Items</h3>

          <Button
            onClick={addFaqItem}
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add FAQ Item
          </Button>

          {faqConfig.items.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">No FAQ items added yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {faqConfig.items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-3 flex justify-between items-center"
                >
                  <div className="truncate flex-1">
                    {item.question || "Unnamed Question"}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveFaqItem(item.id, "up")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <MoveUp size={16} />
                    </button>
                    <button
                      onClick={() => moveFaqItem(item.id, "down")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <MoveDown size={16} />
                    </button>
                    <button
                      onClick={() => removeFaqItem(item.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAQ Item Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">
            FAQ Item Configuration
          </h3>

          {faqConfig.items.length > 0 ? (
            faqConfig.items
              .filter((item) => activeItem === item.id)
              .map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={item.question}
                        onChange={(e) =>
                          updateFaqItem(item.id, "question", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Answer
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
                        value={item.answer}
                        onChange={(e) =>
                          updateFaqItem(item.id, "answer", e.target.value)
                        }
                      />
                    </div>

                    {/* FAQ Item Styles */}
                    <div className="pt-2 border-t border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Item Styles
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Question Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={item.styles.questionColor}
                              onChange={(e) =>
                                updateFaqItemStyle(
                                  item.id,
                                  "questionColor",
                                  e.target.value
                                )
                              }
                              className="w-6 h-6 rounded cursor-pointer"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Answer Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={item.styles.answerColor}
                              onChange={(e) =>
                                updateFaqItemStyle(
                                  item.id,
                                  "answerColor",
                                  e.target.value
                                )
                              }
                              className="w-6 h-6 rounded cursor-pointer"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Background
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={item.styles.bgColor}
                              onChange={(e) =>
                                updateFaqItemStyle(
                                  item.id,
                                  "bgColor",
                                  e.target.value
                                )
                              }
                              className="w-6 h-6 rounded cursor-pointer"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Border Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={item.styles.borderColor}
                              onChange={(e) =>
                                updateFaqItemStyle(
                                  item.id,
                                  "borderColor",
                                  e.target.value
                                )
                              }
                              className="w-6 h-6 rounded cursor-pointer"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Question Size
                          </label>
                          <select
                            className="w-full text-xs p-1 border rounded"
                            value={item.styles.questionFontSize}
                            onChange={(e) =>
                              updateFaqItemStyle(
                                item.id,
                                "questionFontSize",
                                e.target.value
                              )
                            }
                          >
                            <option value="0.875rem">Small</option>
                            <option value="1rem">Medium</option>
                            <option value="1.125rem">Large</option>
                            <option value="1.25rem">Extra Large</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Answer Size
                          </label>
                          <select
                            className="w-full text-xs p-1 border rounded"
                            value={item.styles.answerFontSize}
                            onChange={(e) =>
                              updateFaqItemStyle(
                                item.id,
                                "answerFontSize",
                                e.target.value
                              )
                            }
                          >
                            <option value="0.875rem">Small</option>
                            <option value="1rem">Medium</option>
                            <option value="1.125rem">Large</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Icon Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={item.styles.iconColor}
                              onChange={(e) =>
                                updateFaqItemStyle(
                                  item.id,
                                  "iconColor",
                                  e.target.value
                                )
                              }
                              className="w-6 h-6 rounded cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">Select an FAQ item to configure</p>
            </div>
          )}
        </div>

        {/* FAQ Section Styles and Preview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Section Styles
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={faqConfig.styles.bgColor}
                    onChange={(e) =>
                      setFaqConfig((prev) => ({
                        ...prev,
                        styles: {
                          ...prev.styles,
                          bgColor: e.target.value,
                        },
                      }))
                    }
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Padding
                </label>
                <select
                  className="w-full text-sm p-2 border rounded"
                  value={faqConfig.styles.padding}
                  onChange={(e) =>
                    setFaqConfig((prev) => ({
                      ...prev,
                      styles: {
                        ...prev.styles,
                        padding: e.target.value,
                      },
                    }))
                  }
                >
                  <option value="0.5rem">Small</option>
                  <option value="1rem">Medium</option>
                  <option value="1.5rem">Large</option>
                  <option value="2rem">Extra Large</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Border Radius
                </label>
                <select
                  className="w-full text-sm p-2 border rounded"
                  value={faqConfig.styles.borderRadius}
                  onChange={(e) =>
                    setFaqConfig((prev) => ({
                      ...prev,
                      styles: {
                        ...prev.styles,
                        borderRadius: e.target.value,
                      },
                    }))
                  }
                >
                  <option value="0">None</option>
                  <option value="0.25rem">Small</option>
                  <option value="0.5rem">Medium</option>
                  <option value="1rem">Large</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gap Between Items
                </label>
                <select
                  className="w-full text-sm p-2 border rounded"
                  value={faqConfig.styles.gap}
                  onChange={(e) =>
                    setFaqConfig((prev) => ({
                      ...prev,
                      styles: {
                        ...prev.styles,
                        gap: e.target.value,
                      },
                    }))
                  }
                >
                  <option value="0.25rem">Small</option>
                  <option value="0.5rem">Medium</option>
                  <option value="0.75rem">Large</option>
                  <option value="1rem">Extra Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              FAQ Preview
            </h3>
            <div
              className="border border-dashed border-gray-400 rounded-lg"
              style={{
                backgroundColor: faqConfig.styles.bgColor,
                padding: faqConfig.styles.padding,
                borderRadius: faqConfig.styles.borderRadius,
              }}
            >
              {faqConfig.items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  FAQ items will appear here
                </p>
              ) : (
                <div
                  className="space-y-4"
                  style={{ gap: faqConfig.styles.gap }}
                >
                  {faqConfig.items.map((item) => (
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
                        onClick={() => toggleFaqItem(item.id)}
                        style={{
                          color: item.styles.questionColor,
                          fontSize: item.styles.questionFontSize,
                        }}
                      >
                        <span className="text-left font-medium">
                          {item.question}
                        </span>
                        {activeItem === item.id ? (
                          <ChevronUp
                            size={20}
                            style={{ color: item.styles.iconColor }}
                          />
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
