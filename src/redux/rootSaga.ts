import { all, fork } from "redux-saga/effects";
import { watchTokenWs } from "./sagas/watchTokenWs.saga";
import { watchThrottledMessages } from "./sagas/watchThrottledMessages.saga";
import { watchTokenListWs } from "./sagas/watchTokenListWs.saga";

export default function* rootSaga() {
  yield all([
    fork(watchTokenWs),
    fork(watchThrottledMessages),
    fork(watchTokenListWs),
  ]);
}
