import axios from "axios";

const API = axios.create({
  baseURL: "https://contact-management-backend-i4k5.onrender.com/api",
});

// har request ke saath token attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
