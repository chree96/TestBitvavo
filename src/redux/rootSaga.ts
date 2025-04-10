import { all, fork } from "redux-saga/effects";
import { watchTokenWs } from "./sagas/watchTokenWsSaga";
import { watchThrottledMessages } from "./sagas/watchThrottledMessagesSaga";

export default function* rootSaga() {
  yield all([fork(watchTokenWs), fork(watchThrottledMessages)]);
}
