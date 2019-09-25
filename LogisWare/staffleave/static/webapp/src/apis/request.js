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
 * This function is to be used to get the newly produced refresh token
 * sent down by the server. It should be called everytime you want to make
 * another request to the server on a protected route so as to get the latest access code.
 */
export const getAccessToken = () => {
    let access_token = localStorage.getItem("access_token");
    const request = axios.create({
        baseURL: BASE_URL + "api/v1/",
        headers: { 'Authorization': `Bearer ${access_token}` }
    });
    return request;
}