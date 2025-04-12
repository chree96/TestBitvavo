import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import styles from "./Loader.styles";

const Loader = ({ ...props }: ActivityIndicatorProps) => {
  return <ActivityIndicator {...props} style={[styles.loader, props.style]} />;
};

export default Loader;
