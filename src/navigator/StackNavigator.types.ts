export enum Screens {
  HOME = "Home",
  DETAILS = "Details",
}

export type StackNavigatorScreens = {
  [Screens.HOME]: undefined;
  [Screens.DETAILS]: {
    tokenSymbol: string;
  };
};
