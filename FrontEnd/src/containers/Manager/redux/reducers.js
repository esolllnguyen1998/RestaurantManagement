import {
    RECEIVE_API_GET_ALL_STAFF, RECEIVE_API_UPDATE_STAFF,
    RECEIVE_API_ADD_STAFF, RECEIVE_API_DELETE_STAFF,
    RECEIVE_API_UPDATE_ACCOUNT, RECEIVE_API_ADD_TABLE,
    RECEIVE_API_DELETE_TABLE, RECEIVE_API_UPDATE_TABLE,
    RECEIVE_API_DELETE_FOOD, RECEIVE_API_GET_IMPORT_BILL_BY_DATE,
    RECEIVE_API_GET_ORDER_BY_DATE, RECEIVE_API_GET_ORDER_BY_ID,
    RECEIVE_API_GET_RECEIPT_BY_DATE, RECEIVE_API_GET_RECEIPT_BY_ID,
    RECEIVE_API_GET_PAYROLL_BY_ID, REQUEST_API_ADD_PAYROLL
} from './actions';

export const managerReducers = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_UPDATE_STAFF:
        case RECEIVE_API_ADD_STAFF:
        case RECEIVE_API_UPDATE_ACCOUNT:
        case RECEIVE_API_ADD_TABLE:
        case RECEIVE_API_UPDATE_TABLE:
        case RECEIVE_API_GET_IMPORT_BILL_BY_DATE:
            return { ...data };
        case RECEIVE_API_DELETE_STAFF:
        case RECEIVE_API_DELETE_TABLE:
        case RECEIVE_API_DELETE_FOOD:
            return data;
        default:
            return state;
    }
}

export const managerAllStaffReducers = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_ALL_STAFF:
            return [...data];
        default:
            return state;
    }
}

export const managerImportBillReducers = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_IMPORT_BILL_BY_DATE:
            return { ...data };
        default:
            return state;
    }
}

export const managerOrderByDateReducers = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_ORDER_BY_DATE:
            return { ...data };
        default:
            return state;
    }
}

export const managerOrderByIdReducers = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_ORDER_BY_ID:
            return { ...data };
        default:
            return state;
    }
}


export const managerReceiptReducers = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_RECEIPT_BY_DATE:
            return { ...data };
        default:
            return state;
    }
}

export const managerReceiptIdReducers = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_RECEIPT_BY_ID:
            return { ...data };
        default:
            return state;
    }
}

export const managerPayRollIdReducers = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_PAYROLL_BY_ID:
            return [...data];
        default:
            return state;
    }
}

export const managerAddPayRollIdReducers = (state = {}, { type, data }) => {
    switch (type) {
        case REQUEST_API_ADD_PAYROLL:
            return { ...data }
        default:
            return state;
    }
}
