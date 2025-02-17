import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081", // Base URL for the WAS server
  withCredentials: true, // Ensure cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default instance;
