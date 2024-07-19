const base_url = 'http://localhost:5000/api/';
import axios from 'axios';

export const api = axios.create({
    baseURL: base_url,
    timeout: 1000,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
});

api.interceptors.request.use(
    (config) => {
        console.log('Request :', config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (config) => {
        console.log('Response:', config);
        return config;
    },
    (error) => {
        if (error.response?.status === 401) {
        }
        return Promise.reject(error);
    }
);

/*
 *
 * I't an auth caller
 *
 *
 */

interface loginPayload {
    email: string;
    password: string;
}

export interface registerPayload {
    name: string;
    email: string;
    password: string;
    address: string;
    gender: genderType;
    dateOfBirth: string;
}

export const postLogin = (payload: loginPayload) => {
    return api.post('auth/login', payload);
};

export const postRegister = (payload: registerPayload) => {
    return api.post('auth/register', {
        ...payload,
        gender: genderType[payload.gender],
    });
};

/*
 *
 * it's member caller
 *
 */

export const getMembers = (): Promise<any> => {
    return api.get('members');
};

/*
 *
 * it's classes caller
 *
 */

interface updateClassPayload {
    name?: string;
    description?: string;
    trainerId?: string;
    classCategory?: string;
    maxParticipant?: number;
    date?: Date;
}

export const getClasses = (): Promise<any> => {
    return api.get('classes');
};

export const getClass = (id: string): Promise<any> => {
    return api.get('classes/' + id);
};

export const createClass = (payload: any) => {
    return api.post('classes', payload);
};

export const updateClass = (
    payload: updateClassPayload,
    id: string
): Promise<any> => {
    return api.post('classess/' + id, payload);
};

export const deleteClass = (id: string): Promise<any> => {
    return api.delete('classes/' + id);
};

/*
 *
 * attendances
 *
 */

export const getAttendances = (opts: {
    today?: boolean;
    checkOut?: boolean;
    startDate?: Date;
    endDate?: Date;
}): Promise<any> => {
    return api.get('attendances' + opts.today ? '?today=true' : '');
};

export const getAttendancesCode = (): Promise<any> => {
    return api.get('attendances/code');
};

export const getMemberships = (): Promise<any> => {
    return api.get('memberships');
};

/*
 * Employees
 */
export const getEmployee = () => {
    return api.get('employees');
};

export enum genderType {
    male,
    female,
}
