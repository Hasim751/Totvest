import axios from 'axios';
// config
import { HOST_API_KEY } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

const api = axios.create({
  baseURL: HOST_API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

const privateApi = axios.create({
  baseURL: HOST_API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

privateApi.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

export { privateApi, api };

