import axios from 'axios';
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: "http://localhost:3333/" });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

const api = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

const privateApi = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

privateApi.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

export { privateApi, api };

