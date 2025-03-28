/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FormSectionPreview = ({ formSection }: { formSection: any }) => {
  if (!formSection || Object.keys(formSection).length === 0) {
    return null;
  }

  return (
    <div
      className={`w-full rounded-lg ${
        !formSection || Object.keys(formSection).length === 0
          ? ""
          : "p-12 mt-12"
      }`}
      style={{
        backgroundColor: formSection.styles.bgColor,
        padding: formSection.styles.padding,
        borderRadius: formSection.styles.borderRadius,
      }}
    >
      <form className="space-y-4">
        {formSection.fields?.map((field: any) => (
          <div key={field.id} className="space-y-2">
            <Label
              style={{
                color: field.styles.labelColor,
              }}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
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
                {field.options?.map((option: string, idx: number) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <div className="space-y-2">
                {field.options?.map((option: string, idx: number) => (
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
                {field.options?.map((option: string, idx: number) => (
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
        {formSection.fields?.length > 0 && (
          <Button
            type="submit"
            style={{
              backgroundColor: formSection.styles.buttonBgColor,
              color: formSection.styles.buttonTextColor,
            }}
          >
            {formSection.submitText}
          </Button>
        )}
      </form>
    </div>
  );
};

export default FormSectionPreview;
