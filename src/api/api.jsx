import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// sign out
export const signOutAdmin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("adminProfile");
  localStorage.removeItem("instructorProfile");
  localStorage.removeItem("profileTimestamp");
  localStorage.removeItem("userType");
  window.location.href = "/login";
};
