import axios, { InternalAxiosRequestConfig } from "axios";



const axiosInstance = axios.create({
    baseURL: 'http://localhost:9000'
    // timeout: 10000,
    // headers: { 'Content-Type': 'application/json' },
}) 
axiosInstance.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
        // You can modify the request config here if needed
      
        return config;
    })

export default axiosInstance;
   