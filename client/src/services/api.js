import axios from "axios";
import { getToken } from "../utils/auth";

const api = axios.create({
  baseURL: "https://ngo-donation-system-2yw8.onrender.com/api"
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
