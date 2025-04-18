"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ICardConfig } from "@/types/Interface";
import {
  alignItemsOptions,
  borderRadiusOptions,
  contentSizeOptions,
  flexDirectionOptions,
  fontFamilyOptions,
  fontWeightOptions,
  gapOptions,
  getDefaultCard,
  headingSizeOptions,
  justifyContentOptions,
  paddingOptions,
} from "./Features.contant";
import { PlusIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  resetFeatures,
  setFeatures,
} from "@/redux/features/layout/layoutSlice";

const Features = () => {
  const [cards, setCards] = useState<ICardConfig[]>([]);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const dispatch = useDispatch();

  // Add a new card
  const addNewCard = () => {
    const newCard = getDefaultCard();
    setCards([...cards, newCard]);
    setEditingCardId(newCard.id);
    setIsAddingNew(true);
  };

  // Update a card
  const updateCard = (id: string, updatedProps: Partial<ICardConfig>) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, ...updatedProps } : card
      )
    );
  };

  // Remove a card
  const removeCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
    if (editingCardId === id) {
      setEditingCardId(null);
    }
  };

  // Start editing a card
  const startEditing = (id: string) => {
    setEditingCardId(id);
    setIsAddingNew(false);
  };

  // Cancel editing
  const cancelEditing = () => {
    if (isAddingNew && editingCardId) {
      removeCard(editingCardId);
    }
    setEditingCardId(null);
    setIsAddingNew(false);
  };

  const handleSaveLayout = () => {
    // Save the layout configuration to Redux store
    dispatch(setFeatures(cards));
    // ...
  };

  const handleReset = () => {
    // Reset the layout configuration
    dispatch(resetFeatures());
    // ...
  };

  return (
    <div className="w-full p-4">
      {/* Configuration Panel */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Features Configuration
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={handleSaveLayout}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Save in Layout
            </Button>
            <Button
              onClick={handleReset}
              className="px-4 py-2 bg-white text-blue-500  rounded hover:bg-gray-200 cursor-pointer border border-blue-500"
            >
              Reset
            </Button>
          </div>
        </div>

        <hr className="my-4 border border-gray-400 border-dashed" />

        {/* Editing Form */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-gray-700">Make Card </h1>
            <Button
              onClick={addNewCard}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer flex items-center justify-center"
            >
              <PlusIcon className="w-10 h-10 " />
            </Button>
          </div>
          <hr className="my-4" />
          {editingCardId && (
            <div>
              {/* content style */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                      value={
                        cards.find((c) => c.id === editingCardId)
                          ?.backgroundColor || "#ffffff"
                      }
                      onChange={(e) =>
                        updateCard(editingCardId, {
                          backgroundColor: e.target.value,
                        })
                      }
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {
                        cards.find((c) => c.id === editingCardId)
                          ?.backgroundColor
                      }
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                      value={
                        cards.find((c) => c.id === editingCardId)?.textColor ||
                        "#333333"
                      }
                      onChange={(e) =>
                        updateCard(editingCardId, {
                          textColor: e.target.value,
                        })
                      }
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {cards.find((c) => c.id === editingCardId)?.textColor}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Border Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                      value={
                        cards.find((c) => c.id === editingCardId)
                          ?.borderColor || "#e2e8f0"
                      }
                      onChange={(e) =>
                        updateCard(editingCardId, {
                          borderColor: e.target.value,
                        })
                      }
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {cards.find((c) => c.id === editingCardId)?.borderColor}
                    </span>
                  </div>
                </div>
              </div>

              {/* content type */}
              <div className="mt-3 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title Size
                    </label>
                    <select
                      className="w-full px-3 py-1 border border-gray-300 rounded"
                      value={
                        cards.find((c) => c.id === editingCardId)?.titleSize ||
                        "text-xl"
                      }
                      onChange={(e) =>
                        updateCard(editingCardId, {
                          titleSize: e.target.value,
                        })
                      }
                    >
                      {headingSizeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title Weight
                    </label>
                    <select
                      className="w-full px-3 py-1 border border-gray-300 rounded"
                      value={
                        cards.find((c) => c.id === editingCardId)
                          ?.titleWeight || "font-bold"
                      }
                      onChange={(e) =>
                        updateCard(editingCardId, {
                          titleWeight: e.target.value,
                        })
                      }
                    >
                      {fontWeightOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      value={
                        cards.find((c) => c.id === editingCardId)?.title || ""
                      }
                      onChange={(e) =>
                        updateCard(editingCardId, { title: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* description */}
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description Size
                    </label>
                    <select
                      className="w-full px-3 py-1 border border-gray-300 rounded"
                      value={
                        cards.find((c) => c.id === editingCardId)
                          ?.descriptionSize || "text-base"
                      }
                      onChange={(e) =>
                        updateCard(editingCardId, {
                          descriptionSize: e.target.value,
                        })
                      }
                    >
                      {contentSizeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description Weight
                    </label>
                    <select
                      className="w-full px-3 py-1 border border-gray-300 rounded"
                      value={
                        cards.find((c) => c.id === editingCardId)
                          ?.descriptionWeight || "font-normal"
                      }
                      onChange={(e) =>
                        updateCard(editingCardId, {
                          descriptionWeight: e.target.value,
                        })
                      }
                    >
                      {fontWeightOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    value={
                      cards.find((c) => c.id === editingCardId)?.description ||
                      ""
                    }
                    onChange={(e) =>
                      updateCard(editingCardId, {
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* font family and icon */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Family
                  </label>
                  <select
                    className="w-full px-3 py-1 border border-gray-300 rounded"
                    value={
                      cards.find((c) => c.id === editingCardId)?.fontFamily ||
                      "font-sans"
                    }
                    onChange={(e) =>
                      updateCard(editingCardId, {
                        fontFamily: e.target.value,
                      })
                    }
                  >
                    {fontFamilyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon (Emoji)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-1 border border-gray-300 rounded"
                      maxLength={2}
                      value={
                        cards.find((c) => c.id === editingCardId)?.icon || ""
                      }
                      onChange={(e) =>
                        updateCard(editingCardId, { icon: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* layout style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flex Direction
                  </label>
                  <select
                    className="w-full px-3 py-1 border border-gray-300 rounded"
                    value={
                      cards.find((c) => c.id === editingCardId)
                        ?.flexDirection || "flex-col"
                    }
                    onChange={(e) =>
                      updateCard(editingCardId, {
                        flexDirection: e.target.value,
                      })
                    }
                  >
                    {flexDirectionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Justify Content
                  </label>
                  <select
                    className="w-full px-3 py-1 border border-gray-300 rounded"
                    value={
                      cards.find((c) => c.id === editingCardId)
                        ?.justifyContent || "justify-center"
                    }
                    onChange={(e) =>
                      updateCard(editingCardId, {
                        justifyContent: e.target.value,
                      })
                    }
                  >
                    {justifyContentOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Align Items
                  </label>
                  <select
                    className="w-full px-3 py-1 border border-gray-300 rounded"
                    value={
                      cards.find((c) => c.id === editingCardId)?.alignItems ||
                      "items-center"
                    }
                    onChange={(e) =>
                      updateCard(editingCardId, {
                        alignItems: e.target.value,
                      })
                    }
                  >
                    {alignItemsOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gap
                  </label>
                  <select
                    className="w-full px-3 py-1 border border-gray-300 rounded"
                    value={
                      cards.find((c) => c.id === editingCardId)?.gap || "gap-4"
                    }
                    onChange={(e) =>
                      updateCard(editingCardId, { gap: e.target.value })
                    }
                  >
                    {gapOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Padding
                  </label>
                  <select
                    className="w-full px-3 py-1 border border-gray-300 rounded"
                    value={
                      cards.find((c) => c.id === editingCardId)?.padding ||
                      "p-4"
                    }
                    onChange={(e) =>
                      updateCard(editingCardId, { padding: e.target.value })
                    }
                  >
                    {paddingOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Border Radius
                  </label>
                  <select
                    className="w-full px-3 py-1 border border-gray-300 rounded"
                    value={
                      cards.find((c) => c.id === editingCardId)?.borderRadius ||
                      "rounded"
                    }
                    onChange={(e) =>
                      updateCard(editingCardId, {
                        borderRadius: e.target.value,
                      })
                    }
                  >
                    {borderRadiusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Border Width
                  </label>
                  <select
                    className="w-full px-3 py-1 border border-gray-300 rounded"
                    value={
                      cards.find((c) => c.id === editingCardId)?.borderWidth ||
                      "border"
                    }
                    onChange={(e) =>
                      updateCard(editingCardId, {
                        borderWidth: e.target.value,
                      })
                    }
                  >
                    <option value="border-0">None</option>
                    <option value="border">Default</option>
                    <option value="border-2">Thick</option>
                    <option value="border-4">Thicker</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={cancelEditing}
                  className="px-4 py-1 bg-white text-blue-500 rounded hover:bg-gray-200 cursor-pointer border border-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditingCardId(null)}
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cards Preview - Completely dynamic with no extra CSS */}
      <div className="my-5">
        <h1 className="text-2xl font-semibold mb-2">Features Preview</h1>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => startEditing(card.id)}
              className={`${card.flexDirection} ${card.justifyContent} ${card.alignItems} ${card.gap} ${card.padding} ${card.margin} ${card.borderRadius} ${card.borderWidth} ${card.fontFamily}`}
              style={{
                backgroundColor: card.backgroundColor,
                color: card.textColor,
                borderColor: card.borderColor,
              }}
            >
              <div
                className={`${card.flexDirection} ${card.justifyContent} ${card.alignItems} ${card.gap}`}
              >
                <div className={card.titleSize}>{card.icon}</div>
                <h3 className={`${card.titleSize} ${card.titleWeight}`}>
                  {card.title}
                </h3>
                <p
                  className={`${card.descriptionSize} ${card.descriptionWeight}`}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {cards.length === 0 && !editingCardId && (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              No cards added yet. Click the &quot;+&ldquo; button to get
              started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;
