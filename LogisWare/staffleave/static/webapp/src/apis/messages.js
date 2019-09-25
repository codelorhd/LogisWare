import axios from 'axios';
import { BASE_URL } from './base';

export default axios.create({
    baseURL: BASE_URL + "account/communication/"
});