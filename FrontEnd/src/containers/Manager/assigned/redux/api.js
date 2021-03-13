import { API_URL } from '../../../../models/risotto-enviroment';

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



export const assignedToStaff = async (data) => {
    const access_Token = 'Bearer ' + sessionStorage.getItem('token')
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_Token
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(API_URL + "manage/assigned/add", requestOption);
        const data = await response.json();
        return data;
    }
    catch (ex) {
        console.log(ex);
    }
}


export const getAllAssignedStaff = async (staffId) => {
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
        const response = await fetch(API_URL + "manage/assigned/get/staff/" + staffId, requestOption);
        const data = await response.json();
        return data;
    } catch (ex) {
        console.log(ex);
    }
}

export const deleteAssignedStaff = async (data) => {
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
        const response = await fetch(API_URL + "manage/assigned/delete/" + data.assignedId, requestOption); 
        return {
            response,
            ...data
        };
    } catch (ex) {
        console.log(ex);
    }
}