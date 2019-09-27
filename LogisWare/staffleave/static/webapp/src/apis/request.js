import axios from 'axios';
import { BASE_URL } from './base';
import Routes from '../routes';
const access_token = localStorage.getItem("access_token");


export default axios.create({
    baseURL: BASE_URL + "api/v1/",
    headers: {
        Authorization: `Bearer ${access_token}`
    }
});


/**
 * These functions are to be used to get the newly produced refresh token
 * sent down by the server. It should be called everytime you want to make
 * another request to the server on a protected route so as to get the latest access code.
 * 
 * Note: the functions do the same thing
 */

export const refreshTheAccessToken = () => {
    console.log("refreshTheAccessToken");
    return _refreshNow();
}

function _refreshNow() {

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");

    // Do we still have a valid token for this request?
    // if not, please refresh it biko!
    axios.post(BASE_URL + "api/v1/token/verify/", { token: access_token }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
        console.log(error.data);
        if (error.data != undefined && error.data.code == 'token_not_valid') {
            // refresh the token
            axios.post(BASE_URL + "api/v1/refresh", { refresh: refresh_token }).then(error => {
                const newAccessToken = error.data.access;
                localStorage.setItem("access_token", newAccessToken);
            });
        }
    });


    return axios.create({
        baseURL: BASE_URL + "api/v1/",
        headers: { 'Authorization': `Bearer ${access_token}` }
    });
}
async function _awaitRefreshNow() {

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");

    // Do we still have a valid token for this request?
    // if not, please refresh it biko!
    await axios.post(BASE_URL + "api/v1/token/verify/", { token: access_token }).then(response => {

        // console.log(response);
    }).catch(error => {
        if (error.data != undefined && error.data.code == 'token_not_valid') {
            // refresh the token
            axios.post(BASE_URL + "api/v1/refresh", { refresh: refresh_token }).then(error => {
                const newAccessToken = error.data.access;
                localStorage.setItem("access_token", newAccessToken);
            });
        }
    });


    return axios.create({
        baseURL: BASE_URL + "api/v1/",
        headers: { 'Authorization': `Bearer ${access_token}` }
    });
}

export const getRefreshedRequest = async () => {
    console.log("Getting Refreshed request");
    return await _awaitRefreshNow();
}

export const getAccessToken = () => {
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");

    const request = axios.create({
        baseURL: BASE_URL + "api/v1/",
        headers: { 'Authorization': `Bearer ${access_token}` }
    });

    return request;
}