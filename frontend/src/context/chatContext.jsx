import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";

const ChatContext = createContext();

export const ChatProvider =({children}) =>{
    const {socket} = useSocket();

const [messages, setMessages] = useState([]);
const [users, setUsers] = useState([]);
const [rooms, setRooms] = useState([]);


// ROOM CONNECT

const connectRoom = (room) =>{
    if(!socket) return;

     const handleConnect = () => {
    console.log("Socket connected:", socket.id);
    socket.emit("joinroom", { room });
  };

  // If already connected
  if (socket.connected) {
    handleConnect();
  } else {
    socket.on("connect", handleConnect);
  }

}

  const sendMessage = (message, room) =>{

        if(message.trim() === "") return;

        socket.emit("sendMessage", {
            message,
            room,
            time: new Date().toISOString()
        })

        // setMessage("");
    }

    useEffect(() => {
        if(!socket) return;

        
        socket.on("previousMessages", (msgs) =>{
            setMessages(msgs);
        })

        socket.on("recieveMessage", (data) => {
                console.log("MESSAGE RECEIVED:", data);
            setMessages((prev) => [...prev, data])
        })

        socket.on("roomUsers", (users) => {
            setUsers(users);
            console.log(users)
        })
       
        socket.on("rooms", (rooms) =>{
            setRooms(rooms);
        })
    return () => {
        socket.off("connect", handleConnect);
        socket.off("recieveMessage");
        socket.off("roomUsers")
        socket.off("rooms")
        // socket.disconnect()
    };

    },[socket]);

    return(
        <ChatContext.Provider 
        value={{messages,
            users,
            rooms,
            connectRoom,
            sendMessage
        }}>
            {children}
        </ChatContext.Provider>
    )
   
}

export const useChat = () =>{
    return useContext(ChatContext);
}