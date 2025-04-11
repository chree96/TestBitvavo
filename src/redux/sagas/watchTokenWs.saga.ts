import { call, takeLatest } from "redux-saga/effects";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { createSocketChannel } from "./helpers/createSocketChannel";
import { socketWatcher } from "./helpers/socketWatcher";
import { watchToken } from "../slices/tokenSlice";

export function* handleWatchTokenWebSocket(
  action: ReturnType<typeof watchToken>
): Generator<any, void, any> {
  const asset = action.payload;
  //Message received: {"e":"trade","E":1743458749603,"s":"BTCUSDT","t":4760861216,"p":"82435.07000000","q":"0.00181000","T":1743458749602,"m":true,"M":true}
  const client = new W3CWebSocket(
    `wss://stream.binance.com:9443/ws/${asset}@trade`
  );
  const socketChannel = yield call(createSocketChannel, client);
  yield call(socketWatcher, socketChannel, client, watchToken.type);
}

export function* watchTokenWs() {
  yield takeLatest(watchToken.type, handleWatchTokenWebSocket);
}
