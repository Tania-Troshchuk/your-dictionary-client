import Cookie from 'js-cookie';
import axios from 'axios';
import { Middleware } from '@reduxjs/toolkit';

export const BASE_URL = import.meta.env.VITE_BASE_URL

export const clientWithToken = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

export const clientNoToken = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
})

export const setTokenMiddleware: Middleware = () => (next) => (action) => {
  const token = Cookie.get('token')

  if (token) {
    clientWithToken.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  return next(action);
};

