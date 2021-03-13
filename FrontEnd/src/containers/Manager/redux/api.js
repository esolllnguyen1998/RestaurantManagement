import { API_URL } from '../../../models/risotto-enviroment';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../assert/js/uploadfile';

export const getAllStaffs = async () => {
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
        const response = await fetch(API_URL + "manage/staff/get", requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const updateStaff = async (param) => {
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
        const response = await fetch(API_URL + "manage/staff/update", requestOption);
        const data = await response.json();
        if (data) {
            toast.success("Cập nhập nhân viên thành công.", "Thông báo", { displayDuration: 3000 });
        }

        return data;
    }
    catch (ex) {
        console.log(ex);
    }
}

export const addNewStaff = async (param) => {
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
        const response = await fetch(API_URL + "manage/staff/add", requestOption);
        const data = await response.json();
        return data;
    }
    catch (ex) {
        console.log(ex);
    }
}


export const deleteStaff = async (param) => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token')
    const requestOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        redirect: 'follow',
    }
    try {
        const response = await fetch(API_URL + "manage/staff/delete/" + param, requestOption);
        return response;
    }
    catch (ex) {
        console.log(ex);
    }
}


export const updateAccount = async (param) => {
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
        const response = await fetch(API_URL + "manage/account/update", requestOption);
        const data = await response.json();
        if (data) {
            toast.success("Chỉnh sửa thành công.", "Thông báo", { displayDuration: 3000 });
        }
        return data;
    }
    catch (ex) {
        toast.error("Chỉnh sửa không thành công.", "Thông báo", { displayDuration: 3000 });
        console.log(ex);
    }
}


export const createNewTable = async (param) => {
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
        const response = await fetch(API_URL + "manage/table/add", requestOption);
        const data = await response.json();

        if (data) {
            toast.success("Thêm bàn thành công.", "Thông báo", { displayDuration: 3000 });
        }
        return data;
    }
    catch (ex) {
        toast.error("Thêm bàn không thành công.", "Thông báo", { displayDuration: 3000 });
        console.log(ex);
    }
}


export const deleteTables = async (params) => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token')
    const requestOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        redirect: 'follow',
    }
    for (let item of params) {
        try {
            const response = await fetch(API_URL + "manage/table/delete/" + item, requestOption);
            if (response) {
                toast.success("Xóa bàn thành công.", "Thông báo", { displayDuration: 3000 });
            }
            return response;
        }
        catch (ex) {
            toast.error("Xóa bàn không thành công.", "Thông báo", { displayDuration: 3000 });
            console.log(ex);
        }
    }
}

export const updateTable = async (param) => {
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
        const response = await fetch(API_URL + "manage/table/update", requestOption);
        const data = await response.json();
        if (data) {
            toast.success("Chỉnh sửa bàn thành công.", "Thông báo", { displayDuration: 3000 });
        }
        return data;
    }
    catch (ex) {
        toast.error("Chỉnh sửa bàn không thành công.", "Thông báo", { displayDuration: 3000 });
        console.log(ex);
    }
}


export const addFood = async (param) => {
    uploadFile(param);
    return {};
    // const access_Token = 'Bearer ' + sessionStorage.getItem('token')
    // const requestOption = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': access_Token
    //     },
    //     redirect: 'follow',
    //     body: JSON.stringify(param)
    // }
    // try {
    //     const response = await fetch(API_URL + "manage/table/update", requestOption);
    //     const data = await response.json();

    //     return data;
    // }
    // catch (ex) {
    //     console.log(ex);
    // }
}

export const deleteFoods = async (params) => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token')
    const requestOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        redirect: 'follow',
    }
    for (let item of params) {
        try {
            const response = await fetch(API_URL + "manage/food/delete/" + item, requestOption);
            if (response) {
                toast.success("Xóa món ăn thành công.", "Thông báo", { displayDuration: 3000 });
            }
            return response;
        }
        catch (ex) {
            toast.error("Xóa món ăn không thành công.", "Thông báo", { displayDuration: 3000 });
            console.log(ex);
        }
    }
}

export const getAllImportBills = async (param) => {
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
        const response = await fetch(API_URL + "manage/import_bill/get?page=1&size=99999999&from=" + param.dateFrom + "&to=" + param.dateTo, requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const getAllOrders = async (param) => {
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
        const response = await fetch(API_URL + "manage/order/get?page=1&size=99999999&from=" + param.dateFrom + "&to=" + param.dateTo, requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const getOrderById = async (param) => {
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
        const response = await fetch(API_URL + "manage/order/get/" + param, requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const getAllReceipt = async (param) => {
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
        const response = await fetch(API_URL + "manage/receipt/get?page=1&size=99999999&from=" + param.dateFrom + "&to=" + param.dateTo, requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const getReceiptById = async (param) => {
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
        const response = await fetch(API_URL + "manage/receipt/get/" + param, requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const getPayRollById = async (param) => {
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
        const response = await fetch(API_URL + "manage/payroll/getByStaff/" + param, requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const addPayRoll = async (param) => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token');
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
        const response = await fetch(API_URL + "manage/payroll/add", requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}
