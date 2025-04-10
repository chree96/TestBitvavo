import { all, fork } from "redux-saga/effects";
import { watchWebSocket } from "./sagas/wsSaga";
import { watchThrottledMessages } from "./sagas/watchThrottledMessagesSaga";

export default function* rootSaga() {
  yield all([fork(watchWebSocket), fork(watchThrottledMessages)]);
}
