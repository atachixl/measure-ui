import axios from 'axios';
import { notification } from 'antd';

const http = axios.create();
http.interceptors.response.use(
  (res) => {
    const data = res.data;
    return Promise.resolve(data);
  },
  (err) => {
    const res = err.response;
    notification.error({ message: res?.data?.message ?? 'network request error' });
    return Promise.reject(err);
  },
);

export default http;
