import { TouchableOpacity } from "react-native";
import styles from "./TokenListCard.styles";
import { TokenListCardProps } from "./TokenListCard.types";
import TextCustom from "../../atoms/text-custom/TextCustom";

const TokenListCard = ({ token, onPress, style }: TokenListCardProps) => {
  const { price, symbol } = token;

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.container, style]}
    >
      <TextCustom text={symbol} bold />
      <TextCustom text={price} />
    </TouchableOpacity>
  );
};

export default TokenListCard;
