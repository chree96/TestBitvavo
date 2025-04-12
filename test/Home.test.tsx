import React from "react";
import { render } from "@testing-library/react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Home from "../src/screens/home/Home";
import useNavigation from "../src/navigator/useNavigation";

jest.mock("react-native", () => ({
  View: "View",
  FlatList: "FlatList",
  Text: "Text",
  StyleSheet: {
    create: jest.fn(() => ({})),
    flatten: jest.fn((style) => style),
  },
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn(),
  CommonActions: {
    navigate: jest.fn(),
  },
}));

jest.mock("../src/navigator/useNavigation", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock(
  "../src/components/molecules/token-list-card/TokenListCard",
  () => "TokenListCard"
);
jest.mock("../src/components/atoms/loader/Loader", () => "Loader");

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

describe("Home Screen", () => {
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    (useFocusEffect as jest.Mock).mockImplementation((callback) => callback());
  });

  describe("With token list filled", () => {
    beforeEach(() => {
      const mockTokenList = [
        { symbol: "BTCUSDT", price: "123" },
        { symbol: "ETHUSDT", price: "345" },
      ];

      (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
        selectorFn({ token: { tokenList: mockTokenList } })
      );
    });

    test("renders token list", () => {
      const { findByTestId } = render(<Home />);
      const flatList = findByTestId("token-list");

      expect(flatList).toBeTruthy();
    });
  });

  describe("when loading", () => {
    beforeEach(() => {
      (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
        selectorFn({ token: { tokenList: [] } })
      );
    });

    test("shows loader", () => {
      const { getByTestId } = render(<Home />);
      const loader = getByTestId("home-loader");

      expect(loader).toBeTruthy();
    });
  });
});
