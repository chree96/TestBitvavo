import { eventChannel } from "redux-saga";
import {
  wsConnect,
  wsDisconnect,
  wsError,
  wsMessageReceived,
} from "../../slices/wsSlice";
import { w3cwebsocket as W3CWebSocket } from "websocket";

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
