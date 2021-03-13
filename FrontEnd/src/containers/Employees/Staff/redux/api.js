import { API_URL } from '../../../../models/risotto-enviroment';
import { sortByName } from '../../../../assert/js/sort';
import { toast } from 'react-toastify';

export const getAllTable = async () => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token');
    const requestOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token,
        },
        redirect: 'follow'
    }
    try {
        const response = await fetch(API_URL + "manage/table/get", requestOption);
        const data = await response.json();
        sortByName(data);
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const getTableById = async (tableId) => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token');
    const requestOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        redirect: 'follow',
    }
    try {
        const response = await fetch(API_URL + "manage/table/get/" + tableId, requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const getAllFoods = async () => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token');
    const requestOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        redirect: 'follow',
    }
    try {
        const response = await fetch(API_URL + "manage/food/get", requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}


export const addNewOrder = async (tableId) => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token');
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        body: JSON.stringify({ tableId: tableId }),
        redirect: 'follow',
    }
    try {
        const response = await fetch(API_URL + "manage/order/add", requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const addOrderDetails = async (orderInformations) => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token');
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        body: JSON.stringify(orderInformations),
        redirect: 'follow',
    }
    try {
        const response = await fetch(API_URL + "manage/order_detail/addList", requestOption);
        const data = await response.json();
        if (data) {
            toast.success("Đặt món thành công.", "Thông báo", { displayDuration: 3000 });
        }
        return data;
    } catch (ex) {
        toast.error("Đặt món thất bại.", "Thông báo", { displayDuration: 3000 });
        console.log(ex);
    }
}

export const getAllReadyOrder = async () => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token');
    const requestOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        redirect: 'follow',
    }
    try {
        const response = await fetch(API_URL + "/manage/order_detail/get/READY", requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}