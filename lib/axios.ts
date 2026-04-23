import axios from 'axios';
import { initSocket, getSocket } from './socket';

const axiosInstance = axios.create({
  // You can set base URL and other configurations here
});

axiosInstance.interceptors.response.use(
  function (response) {
    if (['put', 'post', 'delete', 'patch'].includes(response.config.method?.toLowerCase() || '')) {
      if (response.data && response.data.success !== false) {
        const socket = getSocket() || initSocket();
        if (socket) {
          socket.emit("contentUpdated", { path: response.config.url });
        }
      }
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
