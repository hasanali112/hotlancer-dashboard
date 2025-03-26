import { ICardConfig } from "@/types/Interface";

// Options for dropdowns
export const headingSizeOptions = [
  { value: "text-xl", label: "Extra Small" },
  { value: "text-2xl", label: "Small" },
  { value: "text-3xl", label: "Medium" },
  { value: "text-4xl", label: "Large" },
  { value: "text-5xl", label: "Extra Large" },
];

export const contentSizeOptions = [
  { value: "text-sm", label: "Small" },
  { value: "text-base", label: "Medium" },
  { value: "text-lg", label: "Large" },
  { value: "text-xl", label: "Extra Large" },
];

export const fontFamilyOptions = [
  { value: "font-sans", label: "Sans" },
  { value: "font-serif", label: "Serif" },
  { value: "font-mono", label: "Monospace" },
];

export const fontWeightOptions = [
  { value: "font-normal", label: "Normal" },
  { value: "font-medium", label: "Medium" },
  { value: "font-semibold", label: "Semi Bold" },
  { value: "font-bold", label: "Bold" },
  { value: "font-extrabold", label: "Extra Bold" },
];

export const flexDirectionOptions = [
  { value: "flex-row", label: "Row" },
  { value: "flex-row-reverse", label: "Row Reverse" },
  { value: "flex-col", label: "Column" },
  { value: "flex-col-reverse", label: "Column Reverse" },
];

export const justifyContentOptions = [
  { value: "justify-start", label: "Start" },
  { value: "justify-end", label: "End" },
  { value: "justify-center", label: "Center" },
  { value: "justify-between", label: "Space Between" },
  { value: "justify-around", label: "Space Around" },
  { value: "justify-evenly", label: "Space Evenly" },
];

export const alignItemsOptions = [
  { value: "items-start", label: "Start" },
  { value: "items-end", label: "End" },
  { value: "items-center", label: "Center" },
  { value: "items-baseline", label: "Baseline" },
  { value: "items-stretch", label: "Stretch" },
];

export const gapOptions = [
  { value: "gap-0", label: "None" },
  { value: "gap-2", label: "Small" },
  { value: "gap-4", label: "Medium" },
  { value: "gap-6", label: "Large" },
  { value: "gap-8", label: "Extra Large" },
];

export const paddingOptions = [
  { value: "p-0", label: "None" },
  { value: "p-2", label: "Small" },
  { value: "p-4", label: "Medium" },
  { value: "p-6", label: "Large" },
  { value: "p-8", label: "Extra Large" },
];

export const borderRadiusOptions = [
  { value: "rounded-none", label: "None" },
  { value: "rounded-sm", label: "Small" },
  { value: "rounded", label: "Medium" },
  { value: "rounded-md", label: "Large" },
  { value: "rounded-lg", label: "Extra Large" },
];

export const getDefaultCard = (): ICardConfig => ({
  id: Math.random().toString(36).substring(2, 9),
  title: "Feature Title",
  description: "Feature description goes here.",
  icon: "🌟",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  borderColor: "#e2e8f0",
  borderRadius: "rounded",
  padding: "p-4",
  margin: "m-2",
  gap: "gap-4",
  flexDirection: "flex-col",
  justifyContent: "justify-center",
  alignItems: "items-center",
  headingSize: "text-xl",
  contentSize: "text-base",
  fontFamily: "font-sans",
  headingWeight: "font-bold",
  contentWeight: "font-normal",
  borderWidth: "border",
});
