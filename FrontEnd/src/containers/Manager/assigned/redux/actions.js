export const REQUEST_GET_ALL_STAFF = "REQUEST_GET_ALL_STAFF";
export const RECEIVE_GET_ALL_STAFF = "RECEIVE_GET_ALL_STAFF";

export const REQUEST_ASSIGNED_TO_STAFF = "REQUEST_ASSIGNED_TO_STAFF";
export const RECEIVE_ASSIGNED_TO_STAFF = "RECEIVE_ASSIGNED_TO_STAFF";

export const REQUEST_REMOVE_ASSIGNED_TO_STAFF = "REQUEST_REMOVE_ASSIGNED_TO_STAFF";
export const RECEIVE_REMOVE_ASSIGNED_TO_STAFF = "RECEIVE_REMOVE_ASSIGNED_TO_STAFF";

export const REQUEST_GET_ALL_ASSIGNED_STAFF = "REQUEST_GET_ALL_ASSIGNED_STAFF";
export const RECEIVE_GET_ALL_ASSIGNED_STAFF = "RECEIVE_GET_ALL_ASSIGNED_STAFF";

export const requestGetAllStaff = () => ({ type: REQUEST_GET_ALL_STAFF})
export const receiveGetAllStaff = (data) => ({ type: RECEIVE_GET_ALL_STAFF, data})

export const requestAssignedToStaff = (data) => ({ type: REQUEST_ASSIGNED_TO_STAFF, data})
export const receiveAssignedToStaff = (data) => ({ type: RECEIVE_ASSIGNED_TO_STAFF, data})

export const requestRemoveAssignedToStaff = (data) => ({ type: REQUEST_REMOVE_ASSIGNED_TO_STAFF, data})
export const receiveRemoveAssignedToStaff = (data) => ({ type: RECEIVE_REMOVE_ASSIGNED_TO_STAFF, data})

export const requestGetAllAssignedStaff = (data) => ({ type: REQUEST_GET_ALL_ASSIGNED_STAFF, data})
export const receiveGetAllAssignedStaff = (data) => ({ type: RECEIVE_GET_ALL_ASSIGNED_STAFF, data})