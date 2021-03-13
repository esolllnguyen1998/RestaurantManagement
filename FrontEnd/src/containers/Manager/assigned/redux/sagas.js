import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_GET_ALL_STAFF, receiveGetAllStaff,
    REQUEST_ASSIGNED_TO_STAFF, receiveAssignedToStaff,
    REQUEST_GET_ALL_ASSIGNED_STAFF, receiveGetAllAssignedStaff,
    REQUEST_REMOVE_ASSIGNED_TO_STAFF, receiveRemoveAssignedToStaff
} from './actions';
import { getAllStaffs, assignedToStaff, getAllAssignedStaff, deleteAssignedStaff } from './api';

function* fetchAllStaff(action) {
    try {
        const data = yield call(getAllStaffs);
        yield put(receiveGetAllStaff(data));
    } catch (e) {
        console.log(e);
    }
}

function* postAssignedToStaff(action) {
    try {
        const data = yield call(assignedToStaff, action.data);
        yield put(receiveAssignedToStaff(data));
    } catch (e) {
        console.log(e);
    }
}

function* fetchAllAssignedStaff(action) {
    try {
        const data = yield call(getAllAssignedStaff, action.data);
        yield put(receiveGetAllAssignedStaff(data));
    } catch (e) {
        console.log(e);
    }
}

function* fetchDeleteAssignedStaff(action) {
    try {
        const data = yield call(deleteAssignedStaff, action.data);
        yield put(receiveRemoveAssignedToStaff(data));
    } catch (e) {
        console.log(e);
    }
}

export default function* assignedSaga() {
    yield takeLatest(REQUEST_GET_ALL_STAFF, fetchAllStaff); 
    yield takeLatest(REQUEST_ASSIGNED_TO_STAFF, postAssignedToStaff); 
    yield takeLatest(REQUEST_GET_ALL_ASSIGNED_STAFF, fetchAllAssignedStaff);
    yield takeLatest(REQUEST_REMOVE_ASSIGNED_TO_STAFF, fetchDeleteAssignedStaff); 
}
