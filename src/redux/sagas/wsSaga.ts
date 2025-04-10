import { call, put, takeLatest, take, race } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  wsConnect,
  wsDisconnect,
  wsError,
  wsMessageReceived,
  wsMessageReceivedRaw,
  wsSubscribe,
} from "../slices/wsSlice";

export function createSocketChannel(client: W3CWebSocket) {
  return eventChannel((emitter) => {
    client.onopen = () => {
      emitter({ type: wsConnect.type });
    };

    client.onmessage = (message) => {
      try {
        //Message received: {"e":"trade","E":1743458749603,"s":"BTCUSDT","t":4760861216,"p":"82435.07000000","q":"0.00181000","T":1743458749602,"m":true,"M":true}
        const data = JSON.parse(message.data.toString());
        emitter({ type: wsMessageReceived.type, data });
      } catch (error) {
        emitter({ type: wsError.type, error });
        emitter({ type: wsDisconnect.type });
        client.close();
      }
    };

    client.onerror = () => {
      emitter({ type: wsError.type, error: "WebSocket error" });
      emitter({ type: wsDisconnect.type });
      client.close();
    };

    return () => {
      emitter({ type: wsDisconnect.type });
      client.close();
    };
  });
}

export function* handleWebSocketConnection(
  action: ReturnType<typeof wsSubscribe>
): Generator<any, void, any> {
  const asset = action.payload;
  const client = new W3CWebSocket(
    `wss://stream.binance.com:9443/ws/${asset}@trade`
  );
  const socketChannel = yield call(createSocketChannel, client);

  try {
    while (true) {
      const { payload, disconnectAction, errorAction } = yield race({
        payload: take(socketChannel),
        disconnectAction: take(wsDisconnect.type),
        errorAction: take(wsError.type),
      });

      if (disconnectAction || errorAction) {
        console.log("Disconnect action received, closing WebSocket");
        client.close();
        break;
      }

      if (payload.type === wsConnect.type) {
        yield put(wsConnect());
      } else if (payload.type === wsError.type) {
        yield put(wsError(payload.error));
      } else if (payload.type === wsDisconnect.type) {
        yield put(wsDisconnect());
      } else if (payload.data) {
        yield put(wsMessageReceivedRaw(payload.data));
      }
    }
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    yield put(wsError(error));
  }
}

export function* watchWebSocket() {
  yield takeLatest(wsSubscribe.type, handleWebSocketConnection);
}
