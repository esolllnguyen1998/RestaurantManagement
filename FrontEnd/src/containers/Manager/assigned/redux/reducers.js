import { RECEIVE_GET_ALL_STAFF, RECEIVE_ASSIGNED_TO_STAFF, RECEIVE_GET_ALL_ASSIGNED_STAFF, RECEIVE_REMOVE_ASSIGNED_TO_STAFF } from './actions'


export const listStaffResponse = (state = [], { type, data }) => {
    switch (type) {
        case RECEIVE_GET_ALL_STAFF:
            return data;
        default:
            return state;
    }
} 


export const assignedToStaffResponse = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_ASSIGNED_TO_STAFF:
            return {
                ...data,
                done: true
            };
        default:
            return { 
                ...state,
                done: false
            };
    }
}

export const deleteAssignedToStaffResponse = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_REMOVE_ASSIGNED_TO_STAFF:
            return {
                ...data,
                done: true
            };
        default:
            return { 
                ...state,
                done: false
            };
    }
} 

export const listAssignedOfStaffResponse = (state = [], { type, data }) => {
    switch (type) {
        case RECEIVE_GET_ALL_ASSIGNED_STAFF:
            return data;
        default:
            return state;
    }
} 