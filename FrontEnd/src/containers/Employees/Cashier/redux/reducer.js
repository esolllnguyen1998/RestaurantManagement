import {
    RECEIVE_API_ALL_TABLE,
    RECEIVE_API_TABLE_BY_ID,
    RECEIVE_API_CREATE_RECEIPT

} from './actions'


export const tableListResponse = (state = [], { type, data }) => {
    switch (type) { 
        case RECEIVE_API_ALL_TABLE:
            return data;
        default:
            return state;
    }
}

export const tableDetailResponse = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_TABLE_BY_ID:
            return data;
        default:
            return state;
    }
}


export const createReceiptResponse = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_CREATE_RECEIPT:
            return data;
        default:
            return {};
    }
}