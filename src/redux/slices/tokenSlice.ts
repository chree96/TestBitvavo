import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, TokenState } from "./tokenSlice.types";

const initialState: TokenState = {
  tokenList: [],
  watchedToken: undefined,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    updateTokenList: (state, action: PayloadAction<Token[]>) => {
      state.tokenList = action.payload;
    },
    updateToken: (state, action: PayloadAction<Token>) => {
      state.watchedToken = action.payload;
    },
    watchToken: (_, _action: PayloadAction<string>) => {},
    watchTokenList: () => {},
  },
});

export const { updateToken, updateTokenList, watchToken, watchTokenList } =
  tokenSlice.actions;
export default tokenSlice.reducer;
