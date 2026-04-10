import axios from "axios";

const API = axios.create({
  baseURL: "https://fintech-52w9.onrender.com",
});

// 🔥 Add interceptor
API.interceptors.request.use((config) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;