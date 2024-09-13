import axios, { AxiosRequestConfig } from 'axios';
import { REMINDER } from './BASEURL';

const instance = axios.create({
  baseURL: REMINDER,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

instance.interceptors.request.use(req => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken !== null) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

const ReminderAPI = {
  get: (url: string) => instance.get(url),
  post: (url: string, data: object, config?: AxiosRequestConfig) =>
    instance.post(url, data, config),
};

export default ReminderAPI;
