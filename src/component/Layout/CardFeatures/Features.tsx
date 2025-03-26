"use client";

import { Button } from "@/components/ui/button";
import {
  resetFeatures,
  setFeatures,
} from "@/redux/features/layout/layoutSlice";
import { useAppSelector } from "@/redux/hook";
import * as Icons from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Features = () => {
  const dispatch = useDispatch();
  const { featuresComponent } = useAppSelector((state) => state.layout);
  const [features, setFeaturesState] = useState(featuresComponent);

  // Add new feature card
  const addFeatureCard = () => {
    const newCard = {
      icon: "Rocket",
      title: `Feature ${features.cards.length + 1}`,
      description: "Description goes here",
      styles: {
        ...features.cards[0].styles,
      },
    };
    setFeaturesState({
      ...features,
      cards: [...features.cards, newCard],
    });
  };

  // Update feature card
  const updateFeatureCard = (index: number, field: string, value: string) => {
    const updatedCards = features.cards.map((card, i) => {
      if (i === index) {
        return {
          ...card,
          [field]: value,
        };
      }
      return card;
    });
    setFeaturesState({ ...features, cards: updatedCards });
  };

  // Update card style
  const updateCardStyle = (
    index: number,
    styleKey: string,
    field: string,
    value: string
  ) => {
    const updatedCards = features.cards.map((card, i) => {
      if (i === index) {
        return {
          ...card,
          styles: {
            ...card.styles,
            [styleKey]: {
              ...card.styles[styleKey as keyof typeof card.styles],
              [field]: value,
            },
          },
        };
      }
      return card;
    });
    setFeaturesState({ ...features, cards: updatedCards });
  };

  // Save features configuration
  const handleSaveFeatures = () => {
    dispatch(setFeatures(features));
  };

  // Reset features
  const handleResetFeatures = () => {
    dispatch(resetFeatures());
    setFeaturesState(featuresComponent);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Features Configuration
        </h2>
        <div className="flex gap-2">
          <Button onClick={handleSaveFeatures}>Save in Layout</Button>
          <Button variant="outline" onClick={handleResetFeatures}>
            Reset
          </Button>
        </div>
      </div>

      <hr className="my-4 border border-gray-400 border-dashed" />

      {features.cards.map((card, index) => (
        <div key={index} className="mb-8 p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-4">Feature Card {index + 1}</h3>

          {/* Icon Selection */}
          <div className="mb-4">
            <label>Icon</label>
            <select
              className="w-full p-2 border rounded"
              value={card.icon}
              onChange={(e) => updateFeatureCard(index, "icon", e.target.value)}
            >
              {Object.keys(Icons).map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>

          {/* Title & Description */}
          <div className="space-y-4 mb-4">
            <div className="flex flex-col gap-2">
              <label>Title</label>
              <input
                value={card.title}
                onChange={(e) =>
                  updateFeatureCard(index, "title", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Description</label>
              <input
                value={card.description}
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  updateFeatureCard(index, "description", e.target.value)
                }
              />
            </div>
          </div>

          {/* Styling Options */}
          <div className="grid grid-cols-2 gap-4">
            {/* Card Styles */}
            <div className="space-y-4">
              <h4 className="font-medium">Card Styles</h4>
              <div>
                <label>Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={card.styles.card.backgroundColor}
                    onChange={(e) =>
                      updateCardStyle(
                        index,
                        "card",
                        "backgroundColor",
                        e.target.value
                      )
                    }
                    className="w-10 h-10"
                  />
                  <input
                    value={card.styles.card.backgroundColor}
                    className="w-20"
                    onChange={(e) =>
                      updateCardStyle(
                        index,
                        "card",
                        "backgroundColor",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div>
                <label>Border Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={card.styles.card.borderColor}
                    onChange={(e) =>
                      updateCardStyle(
                        index,
                        "card",
                        "borderColor",
                        e.target.value
                      )
                    }
                    className="w-10 h-10"
                  />
                  <input
                    value={card.styles.card.borderColor}
                    className="w-20"
                    onChange={(e) =>
                      updateCardStyle(
                        index,
                        "card",
                        "borderColor",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>

            {/* Icon & Text Styles */}
            <div className="space-y-4">
              <h4 className="font-medium">Icon & Text Styles</h4>
              <div>
                <label>Icon Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={card.styles.icon.color}
                    onChange={(e) =>
                      updateCardStyle(index, "icon", "color", e.target.value)
                    }
                    className="w-10 h-10"
                  />
                  <input
                    value={card.styles.icon.color}
                    onChange={(e) =>
                      updateCardStyle(index, "icon", "color", e.target.value)
                    }
                    className="w-20"
                  />
                </div>
              </div>
              <div>
                <label>Icon Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={card.styles.icon.backgroundColor}
                    onChange={(e) =>
                      updateCardStyle(
                        index,
                        "icon",
                        "backgroundColor",
                        e.target.value
                      )
                    }
                    className="w-10 h-10"
                  />
                  <input
                    value={card.styles.icon.backgroundColor}
                    className="w-20"
                    onChange={(e) =>
                      updateCardStyle(
                        index,
                        "icon",
                        "backgroundColor",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Title Styling */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label>Title Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={card.styles.title.color}
                  onChange={(e) =>
                    updateCardStyle(index, "title", "color", e.target.value)
                  }
                  className="w-10 h-10"
                />
                <input
                  value={card.styles.title.color}
                  onChange={(e) =>
                    updateCardStyle(index, "title", "color", e.target.value)
                  }
                  className="w-20"
                />
              </div>
            </div>
            <div>
              <label>Title Font Size</label>
              <input
                type="text"
                value={card.styles.title.fontSize}
                onChange={(e) =>
                  updateCardStyle(index, "title", "fontSize", e.target.value)
                }
                className="w-full p-2 border rounded"
                placeholder="e.g., 1.25rem"
              />
            </div>
            <div>
              <label>Title Font Weight</label>
              <select
                value={card.styles.title.fontWeight}
                onChange={(e) =>
                  updateCardStyle(index, "title", "fontWeight", e.target.value)
                }
                className="w-full p-2 border rounded"
              >
                <option value="300">Light</option>
                <option value="400">Normal</option>
                <option value="600">Semibold</option>
                <option value="700">Bold</option>
              </select>
            </div>
          </div>

          {/* Description Styling */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label>Description Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={card.styles.description.color}
                  onChange={(e) =>
                    updateCardStyle(
                      index,
                      "description",
                      "color",
                      e.target.value
                    )
                  }
                  className="w-10 h-10"
                />
                <input
                  value={card.styles.description.color}
                  onChange={(e) =>
                    updateCardStyle(
                      index,
                      "description",
                      "color",
                      e.target.value
                    )
                  }
                  className="w-20"
                />
              </div>
            </div>
            <div>
              <label>Description Font Size</label>
              <input
                type="text"
                value={card.styles.description.fontSize}
                onChange={(e) =>
                  updateCardStyle(
                    index,
                    "description",
                    "fontSize",
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded"
                placeholder="e.g., 1rem"
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        onClick={addFeatureCard}
        className="w-full mt-4"
        variant="outline"
      >
        Add Feature Card
      </Button>
    </div>
  );
};

export default Features;
