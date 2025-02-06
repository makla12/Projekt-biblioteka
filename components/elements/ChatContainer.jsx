import { useState } from "react";
import Image from "next/image";
import chatIcon from "@/public/chat.svg"
import Chat from "./Chat";

export default function ChatContainer(){
    const [isShown, setIsShown] = useState(false);

    return(
    <>
        <div 
            className="
                w-12 aspect-square fixed right-0 translate-x-[-10%] top-1/4 
                bg-blue-500 rounded-full 4 cursor-pointer flex justify-center items-center
            "
            onClick={()=>{setIsShown(true)}}
        >
            <div className="w-3/4 h-3/4 bg-blue-500 rounded-full animate-ping absolute" />
            <Image src={chatIcon} alt="" className="w-1/2 h-1/2" />
        </div>
        
        <div className={`
            w-full h-full sm:w-[30rem] sm:h-[55rem] fixed right-0 top-0 sm:top-[10%] flex flex-col items-end p-1
            sm:rounded-lg bg-blue-500 transition-transform duration-500 ${!isShown ? "translate-x-full" : "translate-x-0"}`}
        >
            <div className="w-10 aspect-square bg-red-500 rounded-lg right-1 top-1 cursor-pointer flex justify-center items-center font-bold text-xl" onClick={()=>{setIsShown(false)}}>X</div>
            <Chat />
        </div>
    </>
    );
}