module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest", { configFile: "./babel.config.js" }],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-native|@react-native|@react-navigation|@react-native-async-storage|react-native-gesture-handler|react-native-web|pdfjs-dist)/",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  fakeTimers: {
    enableGlobally: true,
  },
};
