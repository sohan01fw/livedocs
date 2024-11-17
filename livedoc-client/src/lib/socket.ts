import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
export const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_HOST_PRODUCTION_URL
    : import.meta.env.VITE_HOST_DEV_URL;

export const socket = io(URL);
