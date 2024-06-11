import axios from "axios";

export const api = axios.create({
  baseURL: 'https://twig-sandbox-v2-.onrender.com/api',
  withCredentials: true
})
