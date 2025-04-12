import { StyleProp, ViewStyle } from "react-native";
import { Token } from "../../../redux/slices/tokenSlice.types";

export interface TokenListCardProps {
  token: Token;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}
