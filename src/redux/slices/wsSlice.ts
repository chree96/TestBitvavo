import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WebSocketState} from './wsSlice.types';

const initialState: WebSocketState = {
  isConnected: false,
  subscribedAsset: null,
  priceUpdates: null,
  error: null,
};

const wsSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    wsConnect: state => {
      state.isConnected = true;
      state.error = null;
    },
    wsDisconnect: state => {
      state.isConnected = false;
      state.priceUpdates = null;
    },
    wsSubscribe: (state, action: PayloadAction<string>) => {
      state.subscribedAsset = action.payload;
    },
    wsMessageReceived: (state, action: PayloadAction<number>) => {
      state.priceUpdates = action.payload;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  wsConnect,
  wsDisconnect,
  wsSubscribe,
  wsMessageReceived,
  wsError,
} = wsSlice.actions;
export default wsSlice.reducer;
