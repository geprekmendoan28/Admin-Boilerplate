import axios from 'axios';
import Cookies from 'js-cookie';
const { REACT_APP_BASE_URL } = process.env;
export const axiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL || 'https://apidev.mejacerita.space',
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');

  config.headers = Object.assign(
    {
      Authorization: `Bearer ${token}`,
    },
    config.headers
  );
  return config;
});
axiosInstance.interceptors.response.use(
  function (response: any) {
    return response.data;
  },
  function (error: any) {
    console.log(error);
    Cookies.remove('token');
    return window.location.pathname === '/login';
  }
);
