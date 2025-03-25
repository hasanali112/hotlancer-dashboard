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

export interface Card {
  icon: string;
  title: string;
  description: string;
  styles: {
    card: {
      backgroundColor: string;
      borderRadius: string;
      borderColor: string;
      borderWidth: string;
      shadowColor: string;
      shadowOpacity: string;
      width: string;
      height: string;
      padding: string;
    };
    icon: {
      backgroundColor: string;
      color: string;
      size: string;
      padding: string;
    };
    title: {
      color: string;
      fontSize: string;
      fontWeight: string;
    };
    description: {
      color: string;
      fontSize: string;
    };
  };
}

export interface Cards {
  cards: Card[];
}
