import { API_URL } from '../../../../models/risotto-enviroment';
import { toast } from 'react-toastify';

export const getAllPendingOrder = async () => {
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
        const response = await fetch(API_URL + "manage/order_detail/get/PENDING", requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const getAllProcessingOrder = async () => {
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
        const response = await fetch(API_URL + "manage/order_detail/get/PROGRESS", requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const updateStatusOrderDetails = async (param) => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token')
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        redirect: 'follow',
        body: JSON.stringify(param)
    }
    try {
        const response = await fetch(API_URL + "manage/order_detail/update/status", requestOption);
        if (response) {
            toast.success("Cập nhật trạng thái thành công.", "Thông báo", { displayDuration: 3000 });
        }
        return response;
    }
    catch (ex) {
        toast.success("Cập nhật trạng thái thất bại.", "Thông báo", { displayDuration: 3000 });
        console.log(ex);
    }
}

export const importBill = async (param) => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token')
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        redirect: 'follow',
        body: JSON.stringify(param)
    }
    try {
        const response = await fetch(API_URL + "manage/import_bill/add", requestOption);
        const data = await response.json();
        return data;
    }
    catch (ex) {
        console.log(ex);
    }
}

