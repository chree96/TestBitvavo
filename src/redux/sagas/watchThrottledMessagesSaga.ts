import { throttle, put } from "redux-saga/effects";
import { wsMessageReceived } from "../slices/wsSlice";
import { updateToken } from "../slices/tokenSlice";

function* handleThrottledMessage(action: any) {
  const { p: price, s: symbol } = action.payload;
  const token = { symbol, price };
  console.log("Throttled message:", price);
  yield put(updateToken(token));
}

export function* watchThrottledMessages() {
  yield throttle(1000, wsMessageReceived.type, handleThrottledMessage);
}
