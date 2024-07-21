const base_url = 'http://localhost:5000/api/';
import axios from 'axios';

export const api = axios.create({
    baseURL: base_url,
    timeout: 1000,
});

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization =
            'Bearer ' + localStorage.getItem('token');
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        if (error.response?.status === 401) {
        }
        return Promise.reject(error);
    }
);

/*
 * Employees
 */
export const getEmployee = () => {
    return api.get('employees');
};
