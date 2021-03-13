import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_ALL_STAFF, receiveApiGetAllStaff,
    REQUEST_API_UPDATE_STAFF, receiveApiUpdateStaff,
    REQUEST_API_ADD_STAFF, receiveApiAddStaff,
    REQUEST_API_DELETE_STAFF, receiveApiDeleteStaff,
    REQUEST_API_UPDATE_ACCOUNT, receiveApiUpdateAccount,
    REQUEST_API_ADD_TABLE, receiveApiAddTable,
    REQUEST_API_DELETE_TABLE, receiveApiDeleteTable,
    REQUEST_API_UPDATE_TABLE, receiveApiUpdateTable,
    REQUEST_API_ADD_FOOD, receiveApiAddFood,
    REQUEST_API_DELETE_FOOD, receiveApiDeleteFood,
    REQUEST_API_GET_IMPORT_BILL_BY_DATE, receiveApiGetImportBillByDate,
    REQUEST_API_GET_ORDER_BY_DATE, receiveApiGetOrderByDate,
    REQUEST_API_GET_ORDER_BY_ID, receiveApiGetOrderById,
    REQUEST_API_GET_RECEIPT_BY_ID, receiveApiGetReceiptById,
    REQUEST_API_GET_RECEIPT_BY_DATE, receiveApiGetReceiptByDate,
    REQUEST_API_GET_PAYROLL_BY_ID, receiveApiGetPayRollById,
    REQUEST_API_ADD_PAYROLL, receiveApiAddPayRoll
} from './actions';
import {
    getAllStaffs, updateStaff,
    addNewStaff, deleteStaff,
    updateAccount, createNewTable,
    deleteTables, updateTable,
    addFood, deleteFoods,
    getAllImportBills, getAllOrders,
    getOrderById, getReceiptById,
    getAllReceipt, getPayRollById,
    addPayRoll
} from './api';

function* fetchAllDataStaffsSaga(action) {
    try {
        const dataStaffs = yield call(getAllStaffs);
        yield put(receiveApiGetAllStaff(dataStaffs));
    } catch (e) {
        console.log(e);
    }
}

function* updateStaffInforSaga(action) {
    try {
        const dataUpdateStaff = yield call(updateStaff, action.payload);
        yield put(receiveApiUpdateStaff(dataUpdateStaff));
    } catch (e) {
        console.log(e);
    }
}

function* postStaffSaga(action) {
    try {
        const dataAddStaff = yield call(addNewStaff, action.payload);
        yield put(receiveApiAddStaff(dataAddStaff));
    } catch (e) {
        console.log(e);
    }
}

function* removeStaffSaga(action) {
    try {
        const deleteMessage = yield call(deleteStaff, action.payload);
        yield put(receiveApiDeleteStaff(deleteMessage));
    } catch (e) {
        console.log(e);
    }
}

function* updateAccountSaga(action) {
    try {
        const updateAccountData = yield call(updateAccount, action.payload);
        yield put(receiveApiUpdateAccount(updateAccountData));
    } catch (e) {
        console.log(e);
    }
}

function* addNewTableSaga(action) {
    try {
        const addTableData = yield call(createNewTable, action.payload);
        yield put(receiveApiAddTable(addTableData));
    } catch (e) {
        console.log(e);
    }
}

function* deleteTableSaga(action) {
    try {
        const responseDelete = yield call(deleteTables, action.payload);
        yield put(receiveApiDeleteTable(responseDelete));
    } catch (e) {
        console.log(e);
    }
}

function* updateTAbleSaga(action) {
    try {
        const updateTableData = yield call(updateTable, action.payload);
        yield put(receiveApiUpdateTable(updateTableData));
    } catch (e) {
        console.log(e);
    }
}

function* addFoodSaga(action) {
    try {
        const addFoodData = yield call(addFood, action.payload);
        yield put(receiveApiAddFood(addFoodData));
    } catch (e) {
        console.log(e);
    }
}

function* deleteFoodSaga(action) {
    try {
        const deleteFoodData = yield call(deleteFoods, action.payload);
        yield put(receiveApiDeleteFood(deleteFoodData));
    } catch (e) {
        console.log(e);
    }
}

function* getAllImportBillSaga(action) {
    try {
        const dataImportBills = yield call(getAllImportBills, action.payload);
        yield put(receiveApiGetImportBillByDate(dataImportBills));
    } catch (e) {
        console.log(e);
    }
}

function* getAllOrderSaga(action) {
    try {
        const dataOrders = yield call(getAllOrders, action.payload);
        yield put(receiveApiGetOrderByDate(dataOrders));
    } catch (e) {
        console.log(e);
    }
}

function* getOrderByIdSaga(action) {
    try {
        const dataOrder = yield call(getOrderById, action.payload);
        yield put(receiveApiGetOrderById(dataOrder));
    } catch (e) {
        console.log(e);
    }
}

function* getAllReceiptSaga(action) {
    try {
        const dataReceipts = yield call(getAllReceipt, action.payload);
        yield put(receiveApiGetReceiptByDate(dataReceipts));
    } catch (e) {
        console.log(e);
    }
}

function* getReceiptByIdSaga(action) {
    try {
        const dataReceipt = yield call(getReceiptById, action.payload);
        yield put(receiveApiGetReceiptById(dataReceipt));
    } catch (e) {
        console.log(e);
    }
}

function* getPayRollByIdSaga(action) {
    try {
        const dataPayRoll = yield call(getPayRollById, action.payload);
        yield put(receiveApiGetPayRollById(dataPayRoll));
    } catch (e) {
        console.log(e);
    }
}

function* addPayRollSaga(action) {
    try {
        const dataAddPayRoll = yield call(addPayRoll, action.payload);
        yield put(receiveApiAddPayRoll(dataAddPayRoll));
    } catch (e) {
        console.log(e);
    }
}

export default function* managerSaga() {
    yield takeLatest(REQUEST_API_GET_ALL_STAFF, fetchAllDataStaffsSaga);
    yield takeLatest(REQUEST_API_UPDATE_STAFF, updateStaffInforSaga);
    yield takeLatest(REQUEST_API_ADD_STAFF, postStaffSaga);
    yield takeLatest(REQUEST_API_DELETE_STAFF, removeStaffSaga);
    yield takeLatest(REQUEST_API_UPDATE_ACCOUNT, updateAccountSaga);
    yield takeLatest(REQUEST_API_ADD_TABLE, addNewTableSaga);
    yield takeLatest(REQUEST_API_DELETE_TABLE, deleteTableSaga);
    yield takeLatest(REQUEST_API_UPDATE_TABLE, updateTAbleSaga);
    yield takeLatest(REQUEST_API_ADD_FOOD, addFoodSaga);
    yield takeLatest(REQUEST_API_DELETE_FOOD, deleteFoodSaga);
    yield takeLatest(REQUEST_API_GET_IMPORT_BILL_BY_DATE, getAllImportBillSaga);
    yield takeLatest(REQUEST_API_GET_ORDER_BY_DATE, getAllOrderSaga);
    yield takeLatest(REQUEST_API_GET_ORDER_BY_ID, getOrderByIdSaga);
    yield takeLatest(REQUEST_API_GET_RECEIPT_BY_ID, getReceiptByIdSaga);
    yield takeLatest(REQUEST_API_GET_PAYROLL_BY_ID, getPayRollByIdSaga);
    yield takeLatest(REQUEST_API_GET_RECEIPT_BY_DATE, getAllReceiptSaga);
    yield takeLatest(REQUEST_API_ADD_PAYROLL, addPayRollSaga);
}
