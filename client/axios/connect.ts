import axios, { AxiosInstance } from 'axios';

export const fetch: AxiosInstance = axios.create({
    baseURL: `http://localhost:${process.env.PORT ? process.env.PORT : 3000}/api`
});