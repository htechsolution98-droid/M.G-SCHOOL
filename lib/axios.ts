import axios from 'axios';
import { initSocket, getSocket } from './socket';

// Determine the base URL based on environment
const baseURL = process.env.NEXT_PUBLIC_API_URL || 
                (typeof window !== 'undefined' 
                  ? '' // Use relative path on client
                  : (process.env.NODE_ENV === 'production' 
                      ? 'https://m-g-school-s4iv.vercel.app' 
                      : 'http://localhost:3000'));

const axiosInstance = axios.create({
  baseURL,
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
