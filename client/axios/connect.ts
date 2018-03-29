import * as Axios from 'axios';

export const fetch: Axios.AxiosInstance = Axios.default.create({
    baseURL: `http://localhost:${process.env.PORT ? process.env.PORT : 3000}/api`
});