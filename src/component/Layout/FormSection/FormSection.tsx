/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  resetFormSection,
  setFormSection,
} from "@/redux/features/layout/layoutSlice";
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type FormField = {
  id: string;
  type:
    | "text"
    | "email"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio";
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[]; // For select, radio, checkbox
  styles: {
    textColor: string;
    labelColor: string;
    bgColor: string;
    borderColor: string;
    fontSize: string;
    width: string;
  };
};

const FormSection = () => {
  const dispatch = useDispatch();
  const [formConfig, setFormConfig] = useState({
    fields: [] as FormField[],
    submitText: "Submit",
    styles: {
      bgColor: "#ffffff",
      textColor: "#333333",
      buttonBgColor: "#3b82f6",
      buttonTextColor: "#ffffff",
      padding: "1.5rem",
      borderRadius: "0.5rem",
    },
  });

  // Add new field
  const addField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: "text",
      label: "New Field",
      placeholder: "Enter text...",
      required: false,
      styles: {
        textColor: "#333333",
        labelColor: "#333333",
        bgColor: "#ffffff",
        borderColor: "#d1d5db",
        fontSize: "1rem",
        width: "100%",
      },
    };
    setFormConfig((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));
  };

  // Remove field
  const removeField = (id: string) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== id),
    }));
  };

  // Move field up/down
  const moveField = (id: string, direction: "up" | "down") => {
    const index = formConfig.fields.findIndex((field) => field.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === formConfig.fields.length - 1)
    ) {
      return;
    }

    const newFields = [...formConfig.fields];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newFields[index], newFields[newIndex]] = [
      newFields[newIndex],
      newFields[index],
    ];

    setFormConfig((prev) => ({
      ...prev,
      fields: newFields,
    }));
  };

  // Update field property
  const updateField = (id: string, property: string, value: any) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === id ? { ...field, [property]: value } : field
      ),
    }));
  };

  // Update field style
  const updateFieldStyle = (id: string, property: string, value: string) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === id
          ? {
              ...field,
              styles: { ...field.styles, [property]: value },
            }
          : field
      ),
    }));
  };

  // Add option to field (for select/radio/checkbox)
  const addOption = (id: string) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === id
          ? {
              ...field,
              options: [
                ...(field.options || []),
                `Option ${(field.options?.length || 0) + 1}`,
              ],
            }
          : field
      ),
    }));
  };

  // Remove option from field
  const removeOption = (id: string, optionIndex: number) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === id
          ? {
              ...field,
              options: field.options?.filter((_, idx) => idx !== optionIndex),
            }
          : field
      ),
    }));
  };

  // Update option text
  const updateOption = (id: string, optionIndex: number, value: string) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === id
          ? {
              ...field,
              options: field.options?.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : field
      ),
    }));
  };

  // Save configuration to Redux
  const handleSaveForm = () => {
    dispatch(setFormSection(formConfig));
  };

  // Reset configuration
  const handleResetForm = () => {
    setFormConfig({
      fields: [],
      submitText: "Submit",
      styles: {
        bgColor: "#ffffff",
        textColor: "#333333",
        buttonBgColor: "#3b82f6",
        buttonTextColor: "#ffffff",
        padding: "1.5rem",
        borderRadius: "0.5rem",
      },
    });
    dispatch(resetFormSection());
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Form Configuration
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={handleSaveForm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Save in Layout
          </Button>
          <Button
            onClick={handleResetForm}
            className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-200 cursor-pointer border border-blue-500"
          >
            Reset
          </Button>
        </div>
      </div>
      <hr className="my-4 border border-gray-400 border-dashed" />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* Form Fields List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Form Fields</h3>

          <Button
            onClick={addField}
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Field
          </Button>

          {formConfig.fields.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">No fields added yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {formConfig.fields.map((field) => (
                <div
                  key={field.id}
                  className="border border-gray-200 rounded-lg p-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {field.label || "Unnamed Field"}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      ({field.type})
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveField(field.id, "up")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <MoveUp size={16} />
                    </button>
                    <button
                      onClick={() => moveField(field.id, "down")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <MoveDown size={16} />
                    </button>
                    <button
                      onClick={() => removeField(field.id)}
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

        {/* Field Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Field Configuration
          </h3>

          {formConfig.fields.length > 0 ? (
            formConfig.fields.map((field) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-700 ">
                    {field.label || "Unnamed Field"}
                  </h4>
                  <select
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                    value={field.type}
                    onChange={(e) =>
                      updateField(
                        field.id,
                        "type",
                        e.target.value as FormField["type"]
                      )
                    }
                  >
                    <option value="text">Text Input</option>
                    <option value="email">Email Input</option>
                    <option value="number">Number Input</option>
                    <option value="textarea">Textarea</option>
                    <option value="select">Dropdown</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio Button</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="mb-2">Label Text</Label>
                    <Input
                      type="text"
                      value={field.label}
                      onChange={(e: any) =>
                        updateField(field.id, "label", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label className="mb-2">Placeholder</Label>
                    <Input
                      type="text"
                      value={field.placeholder}
                      onChange={(e: any) =>
                        updateField(field.id, "placeholder", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`required-${field.id}`}
                      checked={field.required}
                      onChange={(e) =>
                        updateField(field.id, "required", e.target.checked)
                      }
                    />
                    <Label htmlFor={`required-${field.id}`}>Required</Label>
                  </div>

                  {/* Options for select/radio/checkbox */}
                  {(field.type === "select" ||
                    field.type === "radio" ||
                    field.type === "checkbox") && (
                    <div className="space-y-2">
                      <Label className="mb-2">Options</Label>
                      <div className="space-y-2">
                        {field.options?.map((option, idx) => (
                          <div key={idx} className="flex gap-2">
                            <Input
                              type="text"
                              value={option}
                              onChange={(e: any) =>
                                updateOption(field.id, idx, e.target.value)
                              }
                            />
                            <button
                              onClick={() => removeOption(field.id, idx)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(field.id)}
                        className="mt-2"
                      >
                        <Plus size={14} className="mr-2" /> Add Option
                      </Button>
                    </div>
                  )}

                  {/* Field Styles */}
                  <div className="pt-2 border-t border-gray-200">
                    <Label>Field Styles</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <Label className="text-xs">Text Color</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={field.styles.textColor}
                            onChange={(e) =>
                              updateFieldStyle(
                                field.id,
                                "textColor",
                                e.target.value
                              )
                            }
                            className="w-6 h-6 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Label Color</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={field.styles.labelColor}
                            onChange={(e) =>
                              updateFieldStyle(
                                field.id,
                                "labelColor",
                                e.target.value
                              )
                            }
                            className="w-6 h-6 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Background</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={field.styles.bgColor}
                            onChange={(e) =>
                              updateFieldStyle(
                                field.id,
                                "bgColor",
                                e.target.value
                              )
                            }
                            className="w-6 h-6 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Border Color</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={field.styles.borderColor}
                            onChange={(e) =>
                              updateFieldStyle(
                                field.id,
                                "borderColor",
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
              <p className="text-gray-500">Select a field to configure</p>
            </div>
          )}
        </div>

        {/* Form Styles and Preview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Form Styles</h3>

            <div>
              <Label className="mb-2">Submit Button Text</Label>
              <Input
                type="text"
                value={formConfig.submitText}
                onChange={(e: any) =>
                  setFormConfig((prev) => ({
                    ...prev,
                    submitText: e.target.value,
                  }))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Button Background</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formConfig.styles.buttonBgColor}
                    onChange={(e) =>
                      setFormConfig((prev) => ({
                        ...prev,
                        styles: {
                          ...prev.styles,
                          buttonBgColor: e.target.value,
                        },
                      }))
                    }
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <Label>Button Text</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formConfig.styles.buttonTextColor}
                    onChange={(e) =>
                      setFormConfig((prev) => ({
                        ...prev,
                        styles: {
                          ...prev.styles,
                          buttonTextColor: e.target.value,
                        },
                      }))
                    }
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Background</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formConfig.styles.bgColor}
                    onChange={(e) =>
                      setFormConfig((prev) => ({
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
                <Label>Text Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formConfig.styles.textColor}
                    onChange={(e) =>
                      setFormConfig((prev) => ({
                        ...prev,
                        styles: {
                          ...prev.styles,
                          textColor: e.target.value,
                        },
                      }))
                    }
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Padding</Label>
                <select
                  className="w-full"
                  value={formConfig.styles.padding}
                  onChange={(e) =>
                    setFormConfig((prev) => ({
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
                <Label>Border Radius</Label>
                <select
                  className="w-full"
                  value={formConfig.styles.borderRadius}
                  onChange={(e) =>
                    setFormConfig((prev) => ({
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
            </div>
          </div>

          {/* Form Preview */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Form Preview
            </h3>
            <div
              className="p-6 rounded-lg border border-dashed border-gray-400"
              style={{
                backgroundColor: formConfig.styles.bgColor,
                padding: formConfig.styles.padding,
                borderRadius: formConfig.styles.borderRadius,
              }}
            >
              {formConfig.fields.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Form fields will appear here
                </p>
              ) : (
                <form className="space-y-4">
                  {formConfig.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label
                        style={{
                          color: field.styles.labelColor,
                        }}
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </Label>
                      {field.type === "textarea" ? (
                        <Textarea
                          placeholder={field.placeholder}
                          style={{
                            backgroundColor: field.styles.bgColor,
                            borderColor: field.styles.borderColor,
                            color: field.styles.textColor,
                            fontSize: field.styles.fontSize,
                            width: field.styles.width,
                          }}
                        />
                      ) : field.type === "select" ? (
                        <select
                          style={{
                            backgroundColor: field.styles.bgColor,
                            borderColor: field.styles.borderColor,
                            color: field.styles.textColor,
                            fontSize: field.styles.fontSize,
                            width: field.styles.width,
                            padding: "0.5rem",
                            borderRadius: "0.25rem",
                            borderWidth: "1px",
                          }}
                        >
                          {field.options?.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "checkbox" ? (
                        <div className="space-y-2">
                          {field.options?.map((option, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`${field.id}-${idx}`}
                                style={{
                                  accentColor: field.styles.borderColor,
                                }}
                              />
                              <Label
                                htmlFor={`${field.id}-${idx}`}
                                style={{
                                  color: field.styles.labelColor,
                                }}
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      ) : field.type === "radio" ? (
                        <div className="space-y-2">
                          {field.options?.map((option, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input
                                type="radio"
                                id={`${field.id}-${idx}`}
                                name={field.id}
                                style={{
                                  accentColor: field.styles.borderColor,
                                }}
                              />
                              <Label
                                htmlFor={`${field.id}-${idx}`}
                                style={{
                                  color: field.styles.labelColor,
                                }}
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Input
                          type={field.type}
                          placeholder={field.placeholder}
                          style={{
                            backgroundColor: field.styles.bgColor,
                            borderColor: field.styles.borderColor,
                            color: field.styles.textColor,
                            fontSize: field.styles.fontSize,
                            width: field.styles.width,
                          }}
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: formConfig.styles.buttonBgColor,
                      color: formConfig.styles.buttonTextColor,
                    }}
                  >
                    {formConfig.submitText}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
