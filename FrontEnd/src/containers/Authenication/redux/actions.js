export const REQUEST_API_LOGIN = "REQUEST_API_LOGIN";
export const RECEIVE_API_LOGIN = "RECEIVE_API_LOGIN";

export const requestApiLogin = payload => ({ type: REQUEST_API_LOGIN, payload });
export const receiveApiLogin = data => ({ type: RECEIVE_API_LOGIN, data });
