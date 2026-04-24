import { io } from "socket.io-client";

let socket: ReturnType<typeof io> | null = null;

export const initSocket = () => {
  if (typeof window === 'undefined') return null;
  
  // Vercel does not support WebSockets, so we disable it in production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  if (!socket) {
    socket = io(); // Connects to the same host that served the page
  }
  return socket;
};

export const getSocket = () => {
  return socket;
};
