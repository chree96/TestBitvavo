import { call, takeLatest } from "redux-saga/effects";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { createSocketChannel } from "./helpers/createSocketChannel";
import { socketWatcher } from "./helpers/socketWatcher";
import { watchTokenList } from "../slices/tokenSlice";

export function* handleWatchTokenListWebSocket(): Generator<any, void, any> {
  const client = new W3CWebSocket(
    `wss://stream.binance.com:9443/ws/!miniTicker@arr`
  );
  const socketChannel = yield call(createSocketChannel, client);
  yield call(socketWatcher, socketChannel, client, watchTokenList.type);
}

export function* watchTokenListWs() {
  yield takeLatest(watchTokenList.type, handleWatchTokenListWebSocket);
}
