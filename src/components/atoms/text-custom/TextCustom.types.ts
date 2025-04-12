import { TextProps } from "react-native";

export interface TextCustomProps extends TextProps {
  text: string;
  color?: string;
  bold?: boolean;
}
