import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";


function  Join(){

    // const [username ,setUsername] = useState('');
    const [room ,setRoom] = useState('');
    const navigate = useNavigate();

    
        const location = useLocation();
        const params =new URLSearchParams(location.search);
        const username = localStorage.getItem("user");

        const handleJoin =() =>{

    if(!room){
        alert("Enter Room you want to join.");
        return
    }
    navigate(`/Chat?room=${room}`);
   }


    return(
        <div className="flex justify-center items-center flex-col space-y-5 h-screen">
            <h1 className="text-center font-bold text-[50px]">Chat Me</h1>
            <input className="text-center  w-60 p-2 border rounded-lg" 
            value={username} 
            type="text" 
            // onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" />

            <input className="text-center w-60 p-2 border rounded-lg" 
            value={room} 
            type="text"
             onChange={(e) => setRoom(e.target.value)}
             placeholder="Enter room ID"
             />

            <button  className="bg-blue-600 p-2 rounded-lg w-60 font-bold hover:bg-blue-700 transition duration-300" onClick={handleJoin}>Join</button>
        </div>
    )
}

export default Join;