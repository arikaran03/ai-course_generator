import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; 
// const BASE_URL = `https://k586ql8z-5000.inc1.devtunnels.ms/api`; 

const axiosInstance = axios.create({
    baseURL : BASE_URL, 
}); 

export {
    BASE_URL, 
    axiosInstance
};