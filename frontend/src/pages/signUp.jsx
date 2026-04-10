import { useState } from "react";
import { useNavigate } from "react-router-dom";

function signup(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

  const handleSignup = async() =>{

    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
                },
        body: JSON.stringify({
            username,
            password,
            email,
        }),        
    });

        const data = await res.json();
        console.log(data);
        if(!res.ok){
            alert(data.message);
            return;
        }

       navigate(`/Join?username=${username}`);


    }catch(err){
        console.log(err);
    }
        };

        const handlelogin = () => {
            navigate(`/login`)
        }


    return(
        <div className="flex justify-center border-b  rounded-lg items-center flex-col h-screen space-y-6">
            <div className="flex justify-center   rounded-lg items-center flex-col p-4  fit space-y-6 bg-[#1243C9]">
                <h1 className="text-center text-3xl w-70 font-bold">Sign Up</h1>
            <input type="text"
            className=" text-center text-black w-60 bg-[#748cc9] rounded-lg p-2 focus:outline-none  hover:border-blue-500"
             placeholder="username"
             required
             onChange={(e) => setUsername(e.target.value)}/>

            <input type="text" 
            className="  text-center text-black w-60 bg-[#748cc9] rounded-lg p-2 focus:outline-none hover:border-blue-500"
            placeholder="email"
             required
            onChange={(e) => setEmail(e.target.value)}/>

            <input type="text"
            className="  text-center text-black w-60 bg-[#748cc9] rounded-lg p-2 focus:outline-none hover:border-blue-500"
             placeholder="Password"
             required
             onChange={(e) => setPassword(e.target.value)}/>

             <button onClick={handleSignup} onKeyDown={(e) => {
                if(e.key === "Enter"){
                    e.preventDefault();
                    handleSignup();
                }

             }} className="m-2 rounded-4xl w-60 bg-blue-600 pl-3 pr-3 pt-2 pb-2 hover:bg-blue-500 cursor-pointer">Sign Up</button>
            </div>

            <p>already have an acount? <span className="text-blue-600 hover:text-blue-700 cursor-pointer" onClick={handlelogin}>login in</span></p>
            
        </div>
    )
}


export default signup;