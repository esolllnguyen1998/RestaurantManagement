
import { combineReducers } from "redux";
import loginReduder from "../containers/Authenication/redux/reducers";
import { dataTables, dataTable, dataFoods, dataOrderDetails, dataOrderBasic, dataOrderDetailReady, } from "../containers/Employees/Staff/redux/reducers";
import { dataPendingOrders, dataProcessingOrders, dataUpdateOrders, dataImportBill } from "../containers/Employees/Chef/redux/reducers";
import {
    managerReducers, managerImportBillReducers,
    managerOrderByIdReducers, managerOrderByDateReducers,
    managerReceiptIdReducers, managerReceiptReducers,
    managerPayRollIdReducers, managerAddPayRollIdReducers,
    managerAllStaffReducers
} from '../containers/Manager/redux/reducers';
import { tableListResponse, tableDetailResponse, createReceiptResponse } from '../containers/Employees/Cashier/redux/reducer'
import { aggregateAllTimeResponse, aggregateByTimeResponse } from '../containers/Manager/aggregate/redux/reducers'
import { listStaffResponse, assignedToStaffResponse, listAssignedOfStaffResponse, deleteAssignedToStaffResponse } from '../containers/Manager/assigned/redux/reducers'

const rootReducer = combineReducers({
    loginReduder, dataTables, dataTable, dataFoods,
    dataOrderBasic, dataOrderDetails, dataOrderDetailReady,
    dataPendingOrders, dataProcessingOrders, dataUpdateOrders,
    dataImportBill, managerReducers,
    tableListResponse, tableDetailResponse, createReceiptResponse,
    aggregateAllTimeResponse, aggregateByTimeResponse, managerImportBillReducers,
    managerOrderByIdReducers, managerOrderByDateReducers,
    managerReceiptReducers, managerReceiptIdReducers,
    listStaffResponse, assignedToStaffResponse, listAssignedOfStaffResponse, deleteAssignedToStaffResponse,
    managerImportBillReducers, managerAllStaffReducers,
    managerOrderByIdReducers, managerPayRollIdReducers, managerAddPayRollIdReducers
})

export default rootReducer;
