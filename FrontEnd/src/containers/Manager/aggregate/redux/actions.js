export const REQUEST_AGGREGATE_ALL_TIME = "REQUEST_AGGREGATE_ALL_TIME";
export const RECEIVE_AGGREGATE_ALL_TIME = "RECEIVE_AGGREGATE_ALL_TIME";

export const REQUEST_AGGREGATE_BY_TIME = "REQUEST_AGGREGATE_BY_TIME";
export const RECEIVE_AGGREGATE_BY_TIME = "RECEIVE_AGGREGATE_BY_TIME";


export const requestApiAggregateAllTime = () => ({ type: REQUEST_AGGREGATE_ALL_TIME})
export const receiveApiAggregateAllTime = (data) => ({ type: RECEIVE_AGGREGATE_ALL_TIME, data})


export const requestApiAggregateByTime = (path) => ({ type: REQUEST_AGGREGATE_BY_TIME, path})
export const receiveApiAggregateByTime = (data) => ({ type: RECEIVE_AGGREGATE_BY_TIME, data})