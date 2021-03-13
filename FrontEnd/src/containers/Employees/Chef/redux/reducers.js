import {
    RECEIVE_API_ORDER_PENDING_DATA, RECEIVE_API_ORDER_PROCESSING_DATA,
    RECEIVE_API_POST_UPDATE_STATUS, RECEIVE_API_POST_IMPORT_BILL
} from './actions';

export const dataPendingOrders = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_ORDER_PENDING_DATA:
            return [...data];
        default:
            return state;
    }
}

export const dataProcessingOrders = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_ORDER_PROCESSING_DATA:
            return [...data];
        default:
            return state;
    }
}


export const dataUpdateOrders = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_POST_UPDATE_STATUS:
            return data;
        default:
            return state;
    }
}


export const dataImportBill = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_POST_IMPORT_BILL:
            return data;
        default:
            return state;
    }
}
