import { IconType } from "react-icons";

export interface Feature {
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

export interface IDomain {
  _id: string;
  domainNameList: string;
  customerName: string;
}
