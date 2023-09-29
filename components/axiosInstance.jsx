import axios from "axios";
import Cookies from "js-cookie";

const AxiosInstance = axios.create({
  baseURL: "https://my-kitchen-power-c2f3e0fe1a71.herokuapp.com", // Replace with your backend API URL
});

// Retrieve the token from the cookie
const token = Cookies.get("token");

AxiosInstance.interceptors.request.use((config) => {
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Include the token in the Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default AxiosInstance;
