import React from "react";
import { render } from "@testing-library/react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import Details from "../src/screens/details/Details";

jest.mock("react-native", () => ({
  View: "View",
  Text: "Text",
  Button: "Button",
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
  useRoute: jest.fn(),
  CommonActions: {
    goBack: jest.fn(),
  },
}));

jest.mock("../src/navigator/useNavigation", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../src/components/atoms/loader/Loader", () => "Loader");

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("Details Screen", () => {
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
    (useRoute as jest.Mock).mockReturnValue({
      params: { tokenSymbol: "BTCUSDT" },
    });
  });

  describe("with valid token", () => {
    beforeEach(() => {
      (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
        selectorFn({
          token: { watchedToken: { symbol: "BTCUSDT", price: "123" } },
          websocket: { isConnected: true },
        })
      );
    });

    test("renders token price", () => {
      const { getByText, queryByTestId } = render(<Details />);
      jest.advanceTimersByTime(500);

      expect(getByText(/Prezzo BTCUSDT/)).toBeTruthy();
      expect(queryByTestId("details-loader")).toBeNull();
    });
  });

  describe("when loading", () => {
    beforeEach(() => {
      (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
        selectorFn({
          token: { watchedToken: undefined },
          websocket: { isConnected: false },
        })
      );
    });

    test("shows loader", () => {
      const { getByTestId } = render(<Details />);
      jest.advanceTimersByTime(500);

      expect(getByTestId("details-loader")).toBeTruthy();
    });
  });
});
