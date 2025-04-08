import {call, put, takeLatest, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {w3cwebsocket as W3CWebSocket} from 'websocket';
import { wsConnect, wsError, wsMessageReceived, wsSubscribe } from '../slices/wsSlice';

export function createSocketChannel(selectedAsset: string /* btcusdt */) {
  return eventChannel(emitter => {
    const client = new W3CWebSocket(
      `wss://stream.binance.com:9443/ws/${selectedAsset}@trade`,
    );

    client.onopen = () => {
      emitter({type: wsConnect.type});
    };

    client.onmessage = message => {
      try {
        //Message received: {"e":"trade","E":1743458749603,"s":"BTCUSDT","t":4760861216,"p":"82435.07000000","q":"0.00181000","T":1743458749602,"m":true,"M":true}
        console.log('Message received:', message.data.toString());
        const data = JSON.parse(message.data.toString());
        emitter({data});
      } catch (error) {
        emitter({type: wsError.type, error});
      }
    };

    client.onerror = () => {
      emitter({type: wsError.type, error: 'WebSocket error'});
    };

    return () => {
      client.close();
    };
  });
}

export function* handleWebSocketConnection(
  action: ReturnType<typeof wsSubscribe>,
): Generator<any, void, any> {
  const asset = action.payload;
  const socketChannel = yield call(createSocketChannel, asset);

  try {
    while (true) {
      const payload = yield take(socketChannel);

      if (payload.type === wsConnect.type) {
        yield put(wsConnect());
      } else if (payload.type === wsError.type) {
        yield put(wsError(payload.error));
      } else if (payload.data) {
        yield put(wsMessageReceived(payload.data.p));
      }
    }
  } finally {
    console.log('WebSocket disconnected');
  }
}

export function* watchWebSocket() {
  yield takeLatest(wsSubscribe.type, handleWebSocketConnection);
}
