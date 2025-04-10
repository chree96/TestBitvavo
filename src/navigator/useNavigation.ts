import { useNavigation as useOriginalNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Screens, StackNavigatorScreens } from "./StackNavigator.types";

export type CustomNavigationProp = StackNavigationProp<
  StackNavigatorScreens,
  Screens
>;

const useNavigation = (): CustomNavigationProp => {
  const navigation = useOriginalNavigation<CustomNavigationProp>();

  return navigation;
};

export default useNavigation;
