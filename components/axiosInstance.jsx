import axios from "axios";
import Cookies from "js-cookie";

const AxiosInstance = axios.create({
  baseURL: "https://mkpbackend-fe1c9f5599b1.herokuapp.com/", // Replace with your backend API URL
});



AxiosInstance.interceptors.request.use((config) => {
  // Retrieve the token from the cookie
  const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Include the token in the Authorization header
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});

export default AxiosInstance;
