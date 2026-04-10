import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSocket, disconnectSocket } from "../hooks/useSocket";
import { useSocket } from "../context/SocketContext";

function Login(){

    const{ connectSocket, disconnectSocket } = useSocket();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

  const handleLogin = async() =>{

    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
                },
        body: JSON.stringify({
            username,
            password,
        }),        
    });

        const data = await res.json();
        console.log(data);
        if(!res.ok){
            alert(data.message);
            return;
        }

        localStorage.setItem("token", data.token);

        // disconnectSocket();
        connectSocket();

        localStorage.setItem("user", (username));

       navigate(`/Join`);

    }catch(err){
        console.log(err);
    }
        };

const handleSignup = () =>{
    navigate(`/`)
}
    return(
        <div className="flex justify-center border-b  rounded-lg items-center flex-col h-screen space-y-6">
            <div className="flex justify-center   rounded-lg items-center flex-col p-4  fit space-y-6 bg-[#1243C9]">
                <h1 className="text-center text-3xl w-70 font-bold">Login</h1>
            <input type="text"
            className=" text-center text-black w-60 bg-[#748cc9] focus:outline-none rounded-lg p-2"
             placeholder="username"
             required
             onChange={(e) => setUsername(e.target.value)}/>

            <input type="text"
            className="  text-center text-black w-60 bg-[#748cc9] focus:outline-none rounded-lg p-2 "
             placeholder="Password"
             required
             onKeyDown={(e) => {
                if(e.key === "Enter"){
                    e.preventDefault();
                    handleLogin();
                }

             }}
             onChange={(e) => setPassword(e.target.value)}/>

             <button onClick={handleLogin}  className="m-2 rounded-4xl w-60 bg-blue-600 pl-3 pr-3 pt-2 pb-2 hover:bg-blue-700 cursor-pointer">Login</button>
            </div>

            <p>dont't have an acount? <span className="text-blue-600 hover:text-blue-700 cursor-pointer" onClick={handleSignup}>Sign Up</span></p>
            
        </div>
    )
}


export default Login;