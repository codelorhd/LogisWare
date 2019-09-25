import axios from 'axios';
import { BASE_URL } from './base';
import { request } from '../apis/request';


let access_token = localStorage.getItem("access_token");
let refresh_token = localStorage.getItem("refresh_token");

if ((access_token == null || access_token == undefined)
    && (refresh_token == null || refresh_token == undefined)) {
    console.log("Logging Out");
    access_token = '';
    refresh_token = '';
    // return { type: LOGGED_OUT, payload: { auth_status: 'logout' } };
}

export const refreshToken = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${access_token}` }
});