import { Laptop, Shield, Zap, Code, Cloud, Lock } from "lucide-react";

// Changed IconType to use Lucide's component type
type IconType =
  | typeof Laptop
  | typeof Shield
  | typeof Zap
  | typeof Code
  | typeof Cloud
  | typeof Lock;

interface Feature {
  icon: IconType;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
  cardBgColor?: string;
  cardBorderColor?: string;
  cardBorderStyle?: "solid" | "dashed" | "dotted" | "none";
  cardBorderWidth?: string;
  cardBorderRadius?: string;
}
export const defaultFeatures: Feature[] = [
  {
    icon: Laptop,
    title: "Modern Technology",
    description:
      "Built with the latest technology stack for optimal performance",
    iconColor: "#3b82f6",
    iconBgColor: "#dbeafe",
    cardBgColor: "#ffffff",
    cardBorderColor: "#e5e7eb",
    cardBorderStyle: "solid", // Fixed: use specific string literal
    cardBorderWidth: "1px",
    cardBorderRadius: "0.5rem",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security built into every layer",
    iconColor: "#3b82f6",
    iconBgColor: "#dbeafe",
    cardBgColor: "#ffffff",
    cardBorderColor: "#e5e7eb",
    cardBorderStyle: "solid", // Fixed: use specific string literal
    cardBorderWidth: "1px",
    cardBorderRadius: "0.5rem",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed and exceptional user experience",
    iconColor: "#3b82f6",
    iconBgColor: "#dbeafe",
    cardBgColor: "#ffffff",
    cardBorderColor: "#e5e7eb",
    cardBorderStyle: "solid", // Fixed: use specific string literal
    cardBorderWidth: "1px",
    cardBorderRadius: "0.5rem",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Maintainable and scalable codebase following best practices",
    iconColor: "#3b82f6",
    iconBgColor: "#dbeafe",
    cardBgColor: "#ffffff",
    cardBorderColor: "#e5e7eb",
    cardBorderStyle: "solid", // Fixed: use specific string literal
    cardBorderWidth: "1px",
    cardBorderRadius: "0.5rem",
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    description: "Built for the cloud with scalability in mind",
    iconColor: "#3b82f6",
    iconBgColor: "#dbeafe",
    cardBgColor: "#ffffff",
    cardBorderColor: "#e5e7eb",
    cardBorderStyle: "solid", // Fixed: use specific string literal
    cardBorderWidth: "1px",
    cardBorderRadius: "0.5rem",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data security is our top priority",
    iconColor: "#3b82f6",
    iconBgColor: "#dbeafe",
    cardBgColor: "#ffffff",
    cardBorderColor: "#e5e7eb",
    cardBorderStyle: "solid", // Fixed: use specific string literal
    cardBorderWidth: "1px",
    cardBorderRadius: "0.5rem",
  },
];

// Default feature section properties
export const defaultFeaturesProps = {
  showFeatures: true,
  heading: "Our Features",
  subheading: "What makes us different",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  headingTextColor: "#333333",
  subheadingTextColor: "#666666",
  featureItemTextColor: "#333333",
  cardDefaultBgColor: "#ffffff",
  cardDefaultBorderColor: "#e5e7eb",
  cardDefaultBorderStyle: "solid",
  cardDefaultBorderWidth: "1px",
  cardDefaultBorderRadius: "0.5rem",
  iconDefaultColor: "#3b82f6",
  iconDefaultBgColor: "#dbeafe",
  animationStyle: "scale",
};
