import axios from 'axios';

//const baseURL = 'http://192.168.15.94:8088';
const baseURL = process.env.REACT_APP_BASE_URL

export const Api = axios.create({ baseURL });