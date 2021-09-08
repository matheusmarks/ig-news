import axios from 'axios';


export const api = axios.create({
    baseURL: 'https://nostalgic-shockley-111553.netlify.app/api'
})