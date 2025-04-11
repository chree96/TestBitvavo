import { throttle, put } from "redux-saga/effects";
import { wsMessageReceived } from "../slices/wsSlice";
import {
  updateToken,
  updateTokenList,
  watchToken,
  watchTokenList,
} from "../slices/tokenSlice";

function* handleThrottledMessage(action: any) {
  const { data, type } = action.payload;

  console.log("Throttled message:", action.payload);
  console.log({ type });
  if (type === watchToken.type) {
    const { p: price, s: symbol } = data;
    const token = { symbol, price };
    yield put(updateToken(token));
  } else if (type === watchTokenList.type) {
    const tokenList = data?.map((item: any) => ({
      symbol: item.s,
      price: item.c,
    }));
    yield put(updateTokenList(tokenList));
  }
}

export function* watchThrottledMessages() {
  yield throttle(10000, wsMessageReceived.type, handleThrottledMessage);
}
