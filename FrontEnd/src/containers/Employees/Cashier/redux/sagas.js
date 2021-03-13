import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_ALL_TABLE, receiveApiAllTable,
    REQUEST_API_TABLE_BY_ID, receiveApiTableById,
    REQUEST_API_CREATE_RECEIPT, receiveApiCreateReceipt
} from './actions';
import {getAllTable, getTableById, createReceipt} from './api';


function* fetchAllTable(action){
    try { 
        const data = yield call(getAllTable);
        yield put(receiveApiAllTable(data));
    } catch (e) {
        console.log(e);
    }
}

function* fetchTableByID(action) {
    try {
        const data = yield call(getTableById, action.data);
        yield put(receiveApiTableById(data));
    } catch (e) {
        console.log(e);
    }
}


function* postCreateReceipt(action) {
    try {
        const data = yield call(createReceipt, action.data);
        yield put(receiveApiCreateReceipt(data));
    } catch (e) {
        console.log(e);
    }
}

    

export default function* cashierSaga() {
    yield takeLatest(REQUEST_API_ALL_TABLE, fetchAllTable);
    yield takeLatest(REQUEST_API_TABLE_BY_ID, fetchTableByID);
    yield takeLatest(REQUEST_API_CREATE_RECEIPT, postCreateReceipt);
}