import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://my-kitchen-power-c2f3e0fe1a71.herokuapp.com", // Replace with your backend API URL
});

AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default AxiosInstance;
