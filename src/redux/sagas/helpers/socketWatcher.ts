import { put, race, take } from "redux-saga/effects";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  wsConnect,
  wsDisconnect,
  wsError,
  wsMessageReceived,
} from "../../slices/wsSlice";

export function* socketWatcher(
  socketChannel: any,
  client: W3CWebSocket,
  type: string
) {
  try {
    while (true) {
      const { payload, disconnectAction, errorAction } = yield race({
        payload: take(socketChannel),
        disconnectAction: take(wsDisconnect.type),
        errorAction: take(wsError.type),
      });

      if (disconnectAction || errorAction) {
        console.log("Disconnect action received, closing WebSocket");
        yield put(wsDisconnect());
        client.close();
        break;
      }

      if (payload.type === wsConnect.type) {
        console.log("socket connected");
        yield put(wsConnect());
      } else if (payload.type === wsError.type) {
        yield put(wsError(payload.error));
      } else if (payload.type === wsDisconnect.type) {
        console.log("socket disconnected");
        yield put(wsDisconnect());
      } else if (payload.data) {
        yield put(wsMessageReceived({ data: payload.data, type }));
      }
    }
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    yield put(wsError(error));
  }
}
