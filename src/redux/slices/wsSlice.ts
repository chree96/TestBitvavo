import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketState } from "./wsSlice.types";

const initialState: WebSocketState = {
  isConnected: false,
  error: null,
};

const wsSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    wsConnect: (state) => {
      state.isConnected = true;
      state.error = null;
    },
    wsDisconnect: (state) => {
      state.isConnected = false;
    },
    wsMessageReceived: (_state, _action: PayloadAction<any>) => {},
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { wsConnect, wsDisconnect, wsError, wsMessageReceived } =
  wsSlice.actions;
export default wsSlice.reducer;
