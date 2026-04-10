  import formatTime from "../utils/formatTime";

  
  
  
  function Chatbox({rooms, messages, message, currentUser, setMessage, onSend, setOpenSidebar, onChangeRoom, messageEndRef, onJoinroom}){
  
  



  return(
  <>

 <div className="flex flex-row">
     <div className="md:hidden p-2">
  <button
    onClick={() => setOpenSidebar(true)}
    className="text-white bg-gray-700 px-3 py-2 rounded hover:cursor-pointer"
  >
    ☰
  </button>
</div>
  <div className="p-2 text-sm md:text-base md:p-4 border-b border-gray-800 flex gap-2 md:gap-3 overflow-x-auto ">
                    {rooms.map((r) => (

                    <button className="font-bold w-max text-center p-2 rounded bg-gray-700  text-blue-500 hover:cursor-pointer" onClick={ () => onChangeRoom(r)} key={r}>{r}</button>

                    ))}

                    <button onClick={() => onJoinroom()} className="font-bold w-max text-center p-2 rounded bg-gray-600 text-white hover:bg-gray-500 cursor-pointer ">+ Room</button>
                </div>
 </div>

<div className="flex flex-1 p-2 md:p-4 flex-col overflow-y-auto no-scrollbar ">
                    {messages.map((msg) => {
                        const isMe = msg.username === currentUser ;

                        return(
                        <div key={Math.random()*(Math.random()*100)} className={`rounded  py-1 flex-col text-sm md:text-base max-w-[80%] md:max-w-[60%] flex ${isMe ? "self-end" : "self-start"} bg-gray-800 p-1.5 m-3`}>
                            <strong className={`mr-2 pb-1 text-[15px]  ${isMe ? "hidden" : "block"}`}>{msg.username}</strong>
                            <div>{msg.message}</div>

                            <span className="text-xs text-gray-300 pt-2 pl-2 self-end">
                                {formatTime(msg.time)}
                            </span>
                        </div> )
                         
                    })}

                    <div ref={messageEndRef} />

                </div>
  
  <div className="p-4 border-t border-gray-800 flex flex-row">
                    <input type="text"
                    className="w-full border-fuchsia-950 p-2 rounded
                               sticky bottom-0 text-sm md:text-base"
                    value={message}
                    onChange={(e)=> setMessage(e.target.value)}
                    onKeyDown={(e) =>{
                        if(e.key === "Enter"){
                            e.preventDefault();
                            onSend();
                        }
                    }}
                    placeholder="Type your message...." />

                    <button className=" bg-[#0447ff] text-sm md:text-base rounded p-2 ml-2"
                    onClick={onSend}
                    > Send </button>
                </div>
                </>
  )

  }

  export default Chatbox;