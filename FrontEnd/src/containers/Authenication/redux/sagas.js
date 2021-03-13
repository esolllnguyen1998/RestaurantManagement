import { call, put, takeLatest } from "redux-saga/effects";
import { REQUEST_API_LOGIN, receiveApiLogin } from './actions';
import { loginApi } from './api';

function* postLogin(action) {
    try {
        const data = yield call(loginApi, action.payload);
        yield put(receiveApiLogin(data));
    } catch (e) {
        console.log(e);
    }
}

export default function* loginSaga() {
    yield takeLatest(REQUEST_API_LOGIN, postLogin)
}
