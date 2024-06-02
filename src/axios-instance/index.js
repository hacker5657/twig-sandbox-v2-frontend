import axios from "axios";

export const api = axios.create({
  baseURL: 'https://twig-sandbox-v2-backend.vercel.app/api',
  withCredentials: true
})
