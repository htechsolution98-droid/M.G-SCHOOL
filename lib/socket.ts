import { io } from "socket.io-client";

let socket: ReturnType<typeof io> | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(); // Connects to the same host that served the page
  }
  return socket;
};

export const getSocket = () => {
  return socket;
};
