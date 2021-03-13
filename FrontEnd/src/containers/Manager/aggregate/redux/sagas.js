import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_AGGREGATE_ALL_TIME, receiveApiAggregateAllTime,
    REQUEST_AGGREGATE_BY_TIME, receiveApiAggregateByTime
} from './actions';
import { getAggregateAllTime, getAggregateByTime} from './api';

function* fetchAggregateAllTime(action) {
    try {
        const data = yield call(getAggregateAllTime);
        yield put(receiveApiAggregateAllTime(data));
    } catch (e) {
        console.log(e);
    }
}


function* fetchAggregateByTime(action) {
    try {
        const data = yield call(getAggregateByTime, action.path);
        yield put(receiveApiAggregateByTime(data));
    } catch (e) {
        console.log(e);
    }
}

export default function* aggregateSaga() {
    yield takeLatest(REQUEST_AGGREGATE_ALL_TIME, fetchAggregateAllTime);
    yield takeLatest(REQUEST_AGGREGATE_BY_TIME, fetchAggregateByTime);
}
