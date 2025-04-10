import { throttle, put } from "redux-saga/effects";
import { wsMessageReceived, wsMessageReceivedRaw } from "../slices/wsSlice";

function* handleThrottledMessage(action: any) {
  const price = action.payload.p;
  console.log("Throttled message:", price);
  yield put(wsMessageReceived(price));
}

export function* watchThrottledMessages() {
  yield throttle(1000, wsMessageReceivedRaw.type, handleThrottledMessage);
}
