import {all, fork} from 'redux-saga/effects';
import { watchWebSocket } from './sagas/wsSaga';

export default function* rootSaga() {
  yield all([fork(watchWebSocket)]);
}
