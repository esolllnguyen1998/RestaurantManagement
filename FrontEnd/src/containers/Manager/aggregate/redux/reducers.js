import { RECEIVE_AGGREGATE_ALL_TIME, RECEIVE_AGGREGATE_BY_TIME } from './actions'


export const aggregateAllTimeResponse = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_AGGREGATE_ALL_TIME:
            return data;
        default:
            return state;
    }
}


export const aggregateByTimeResponse = (state = [], { type, data }) => {
    switch (type) {
        case RECEIVE_AGGREGATE_BY_TIME:
            return data;
        default:
            return state;
    }
}
