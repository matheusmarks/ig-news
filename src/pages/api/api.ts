import axios from 'axios';


export const api = axios.create({
    baseURL: 'https://ig-news-5tf4675mz-matheusmarks.vercel.app/api',
})