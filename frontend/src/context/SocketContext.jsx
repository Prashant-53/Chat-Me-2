import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext =  createContext();

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    
    const connectSocket =() => {
        const token = localStorage.getItem("token");

        if(!token) return;

        const newSocket = io("http://localhost:5000", {
            auth: {token}
        });

        setSocket(newSocket);
    };

    const disconnectSocket =() => {
        if(socket){
            socket.dissconnect();
            setSocket(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) connectSocket();
    },[]);
    
    return (
        <SocketContext.Provider  value ={{socket, connectSocket, disconnectSocket}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket =() =>{
    return useContext(SocketContext);
}