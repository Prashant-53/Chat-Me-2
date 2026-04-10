// import { io } from "socket.io-client";

// const token = localStorage.getItem("token");
// const socket = io("http://localhost:5000", {
//     auth: {
//         token
//     }
// }
// );

// export default socket;

import { io } from "socket.io-client";

let socket = null;

export const createSocket = () => {
    const token = localStorage.getItem("token");

    socket = io("http://localhost:5000", {
        auth: { token }
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