import axios from "axios";
import { useAuth } from "./stores/authZustand";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5174",
});


api.interceptors.request.use((cfg) => {
  const token = useAuth.getState().token;
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
