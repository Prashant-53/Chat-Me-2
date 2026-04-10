import { io } from "socket.io-client";

let socket = null;

export const createSocket = () => {
    const token = localStorage.getItem("token");

    socket = io("https://chat-me-2-1.onrender.com", {
        auth: { token },
        transports: ["websocket"] // 🔥 important for Render

    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};