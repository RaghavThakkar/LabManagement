import axios from "axios";
import auth from "../auth/auth";

let axiosConfig = {
    headers: {
        'auth-token': auth.getToken(),
    }
};
const api = axios.create({
    baseURL: "http://localhost:3500/api",
});

export const login = (payload) => api.post(`/login`, payload);

export const getAllStudent = () => api.get(`/`,axiosConfig);
export const getStudentById = (id) => api.get(`/${id}`,axiosConfig);
export const addStudent = (payload) => api.post(`/create`,payload,axiosConfig);
export const updateStudentById = (id, payload) => api.put(`/update/${id}` ,payload,axiosConfig);
export const deleteStudentById = (id) => api.delete(`/delete/${id}`,axiosConfig);
export const addOrDropCourse = (id,payload) => api.put(`/course/add/${id}`,payload,axiosConfig);
export const studentsByCourseCode = (code) => api.get(`/studentsByCourseCode/${code}`,axiosConfig);

export const getAllCourse = () => api.get(`/course/all`,axiosConfig);
export const getNotIncludedCourse = (id) => api.get(`/nonAddedCourse/${id}`,axiosConfig);
export const getCourseById = (id) => api.get(`/course/${id}`,axiosConfig);
export const addCourse = (payload) => api.post(`/course/create`,payload,axiosConfig);
export const updateCourseById = (id, payload) => api.put(`/course/update/${id}` ,payload,axiosConfig);
export const deleteCourseById = (id) => api.delete(`/course/delete/${id}`,axiosConfig);

const apis = {
    login,
    getAllStudent,
    getStudentById,
    addStudent,
    updateStudentById,
    deleteStudentById,
    getAllCourse,
    getCourseById,
    addCourse,
    updateCourseById,
    deleteCourseById,
    addOrDropCourse,
    getNotIncludedCourse,
    studentsByCourseCode
};

export default apis;
