import { call, takeLatest } from "redux-saga/effects";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { createSocketChannel } from "./helpers/createSocketChannel";
import { socketWatcher } from "./helpers/socketWatcher";
import { watchToken } from "../slices/tokenSlice";

export function* handleWatchTokenWebSocket(
  action: ReturnType<typeof watchToken>
): Generator<any, void, any> {
  const asset = action.payload;
  const client = new W3CWebSocket(
    `wss://stream.binance.com:9443/ws/${asset}@trade`
  );
  const socketChannel = yield call(createSocketChannel, client);
  yield call(socketWatcher, socketChannel, client);
}

export function* watchTokenWs() {
  yield takeLatest(watchToken.type, handleWatchTokenWebSocket);
}
