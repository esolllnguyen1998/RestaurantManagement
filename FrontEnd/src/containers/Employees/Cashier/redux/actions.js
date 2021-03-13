export const REQUEST_API_ALL_TABLE = "REQUEST_API_ALL_TABLE";
export const RECEIVE_API_ALL_TABLE = "RECEIVE_API_ALL_TABLE";

export const REQUEST_API_TABLE_BY_ID = "REQUEST_API_TABLE_BY_ID";
export const RECEIVE_API_TABLE_BY_ID = "RECEIVE_API_TABLE_BY_ID";
 
export const REQUEST_API_CREATE_RECEIPT = "REQUEST_API_CREATE_RECEIPT";
export const RECEIVE_API_CREATE_RECEIPT = "RECEIVE_API_CREATE_RECEIPT";



export const requestApiAllTable = () => ({ type: REQUEST_API_ALL_TABLE });
export const receiveApiAllTable = (data) => ({type: RECEIVE_API_ALL_TABLE, data});


export const requestApiTableById = data => ({ type: REQUEST_API_TABLE_BY_ID, data });
export const receiveApiTableById = data => ({type: RECEIVE_API_TABLE_BY_ID, data});


export const requestApiCreateReceipt = data => ({ type: REQUEST_API_CREATE_RECEIPT, data });
export const receiveApiCreateReceipt = data => ({ type: RECEIVE_API_CREATE_RECEIPT, data});