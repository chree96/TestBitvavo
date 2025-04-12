import { RouteProp } from "@react-navigation/native";
import {
  Screens,
  StackNavigatorScreens,
} from "../../navigator/StackNavigator.types";

export type DetailsRouteProps = RouteProp<
  StackNavigatorScreens,
  Screens.DETAILS
>;
