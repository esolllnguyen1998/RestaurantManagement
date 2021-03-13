import {API_URL} from '../../../../models/risotto-enviroment'

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


export const createReceipt = async (data) => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token');
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        body: JSON.stringify(data),
        redirect: 'follow',
    }
    try {
        const response = await fetch(API_URL + "manage/receipt/add", requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}
