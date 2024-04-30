import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL: API_URL });

export const login = (formData) => API.post("/user/login", formData);
export const register = (formData) => API.post("/user/register", formData);
