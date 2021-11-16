import axios from "axios";
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
    credentials: "include",
  },
});

export default api;
