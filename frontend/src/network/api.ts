const base_url = "http://localhost:5000/api"
import axios from 'axios'

export const postLogin = (payload : loginPayload) => {
    return axios
        .post(base_url + "auth/login", payload)
        .then(data => console.log("login response", data))
        .catch(err => console.error)
}

export const postRegister = (payload : registerPayload) => {
    return axios
        .post(base_url + "auth/register", payload)
        .then(data => console.log("register response", data))
        .catch(err => console.error)
}

export const getMembers = () : Promise<any> => {
    return axios.get(base_url + "members")
        .then(data => console.log("member response", data))
        .catch(err => console.error);
}

export const getClasses = () : Promise<any> => {
    return axios
        .get(base_url + "classes")
        .then(data => console.log("get class response", data))
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
        .then(data => console.log("delete class", data))
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
        .get(base_url + "attendances/code")
        .then(data => console.log("get attendance code", data))
        .catch(err => console.error)
}

interface loginPayload {
    email : string;
    password : string;
}

interface registerPayload {
    name : string;
    email : string;
    password : string;
    address : string;
    gender : genderType;
    dateOfBirth : Date;
}

enum genderType 
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

interface updateClassPayload {
    name? : string;
    description? :  string;
    trainerId? : string;
    classCategory? : string;
    maxParticipant? : number;
    date? : Date;
}