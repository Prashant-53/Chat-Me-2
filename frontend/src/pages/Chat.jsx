import { useEffect, useState, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Join from "./Join";
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/ChatBox";
import { jwtDecode } from "jwt-decode";

function Chat(){

const [messages, setMessages] = useState([]);
const [message, setMessage] = useState("");
const [users, setUsers] = useState([]);
const [rooms, setRooms] = useState([]);
const [openSidebar, setOpenSidebar] = useState(false);
const navigate = useNavigate();

    const {socket} = useSocket();
    const location = useLocation();
    const params =new URLSearchParams(location.search);
    const room = params.get('room');
    const messageEndRef =useRef(null);
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const currentUser = decoded.username;


    const scrollBottom = () =>{
        messageEndRef.current?.scrollIntoView({ behavior: "smooth"});
    }

    const joinRoom = () => {

        navigate(`/Join`)
    }

    const changeRoom = (room) => {
        navigate(`/Chat?room=${room}`)
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate(`/login`);
    }

    useEffect(()=>{
        // socket.emit("joinroom", { room });
        // console.log("conncted:" ,socket.id)

        if (!socket) return;

  const handleConnect = () => {
    // console.log("Socket connected:", socket.id);
    socket.emit("joinroom", { room });
  };

  // If already connected
  if (socket.connected) {
    handleConnect();
  } else {
    socket.on("connect", handleConnect);
  }


        socket.on("previousMessages", (msgs) =>{
            setMessages(msgs);
        })

        socket.on("recieveMessage", (data) => {
                // console.log("MESSAGE RECEIVED:", data);
            setMessages((prev) => [...prev, data])
        })

        socket.on("roomUsers", (users) => {
            setUsers(users);
            // console.log(users)
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

    },[socket,room]);

    
    useEffect(()=>{

        scrollBottom();

    },[messages])

    const sendMessage = () =>{

        if(message.trim() === "") return;

        socket.emit("sendMessage", {
            message,
            room,
            time: new Date().toISOString()
        })

        setMessage("");
    }

    return(
        <>
        <div className="flex h-screen">

        
            <Sidebar users={users}   openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} onLogout={handleLogout} /> 

          <div className="  flex flex-col flex-1">

            <Chatbox rooms={rooms} messages={messages} message={message} currentUser={currentUser} 
            setMessage={setMessage} onSend={sendMessage} setOpenSidebar={setOpenSidebar} onChangeRoom={changeRoom} messageEndRef={messageEndRef} 
            onJoinroom={joinRoom}/>

         </div>
        </div>
        </>
    )
}

export default Chat;