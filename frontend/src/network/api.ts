const base_url = "http://localhost:5000/api/"
import axios from 'axios'
import useAuth from '../components/context/Auth'
import { Heart } from 'lucide-react'
export const postLogin = (payload : loginPayload) => {
    return axios
        .post(base_url + "auth/login", payload)
        .catch(err => console.error)
}

export const postRegister = (payload : registerPayload) => {
    return axios
        .post(base_url + "auth/register", {...payload, gender : genderType[payload.gender]})
        .catch(err => console.error)
}

export const getMembers = () : Promise<any> => {
    return axios.get(base_url + "users?role=member", {headers : {Authorization : "Bearer " + localStorage.getItem('token')}})
        .catch(err => console.error);
}

export const getClasses = () : Promise<any> => {
    return axios
        .get(base_url + "classes", {headers : {Authorization : "Bearer " + localStorage.getItem('token')}})
        .catch(err => console.error)
}

export const addClass = (payload : addCLasssPayload) : Promise<any> => {
    return axios
        .post(base_url + "classes", payload)
        .then(data => console.log("add class response", data))
        .catch(err => console.error)
}

export const updateClass = (payload : updateClassPayload, id : string) : Promise<any> => {
    return axios
        .post(base_url + "classess/" + id, payload)
        .then(data => console.log("update class response", data))
        .catch(err => console.error)
}

export const deleteClass = (id : string) : Promise<any> => {
    return axios
        .delete(base_url + "classes/" + id)
        .catch(err => console.error)
}

export const getClass = (id : string) : Promise<any> => {
    return axios
        .get(base_url + "classes/" + id)
        .then(data => console.log("get class success", data))
        .catch(err => console.error)
}

export const getAttendancesCode = () :Promise<any> => {
    return axios
        .get(base_url + "attendances/code", {headers : {Authorization : "Bearer " + localStorage.getItem('token')} } )
        .catch(err => console.error)
}

export const getMemberships= () : Promise<any> => {
    return axios
        .get(base_url + "memberships", {headers : {Authorization : "Bearer " + localStorage.getItem('token')}})
        .catch(err => console.error)
}

export const getAttendances = (opts  : {today? : boolean, checkOut? : boolean, startDate? : Date, endDate? : Date}) : Promise<any> => {
    return axios.get("/attendances" + opts.today ? "?today=true" : "")
        .catch(err => console.error);
}

export const createClass = (payload : any) => {
    return axios.post("/classes", payload).catch(err => console.error);
}

interface loginPayload {
    email : string;
    password : string;
}

export interface registerPayload {
    name : string;
    email : string;
    password : string;
    address : string;
    gender : genderType;
    dateOfBirth : string;
}

export enum genderType 
{
    male,
    female
}

interface addCLasssPayload {
    name : string;
    description :  string;
    trainerId : string;
    classCategory : string;
    maxParticipant : number;
    date : Date
}

export const getEmployee = () => {
    return axios.get(base_url + "employees", {headers : {Authorization : "Bearer " + localStorage.getItem('token')}}).catch(err => console.error)
}

interface updateClassPayload {
    name? : string;
    description? :  string;
    trainerId? : string;
    classCategory? : string;
    maxParticipant? : number;
    date? : Date;
}