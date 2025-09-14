'use client'

import { useRef, useState } from "react";
import Image from "next/image";
import chatIcon from "@/public/chat.svg"
import ResetIcon from "@/public/rollback.svg"
import Chat from "./Chat";
import AlertBox, { showAlertBox } from "../AlertBox";

function clearChatHistory() {
    document.cookie = "chatHistory=;";
    window.location.reload();
}

export default function ChatContainer(){
    const alertRef = useRef(null);
    const [isShown, setIsShown] = useState(false);

    return(
    <>
        <div 
            className="
                w-12 aspect-square fixed right-0 translate-x-[-10%] top-1/4 
                bg-blue-500 rounded-full 4 cursor-pointer flex justify-center items-center
            "
            onClick={()=>setIsShown(true)}
        >
            <div className="w-3/4 h-3/4 bg-blue-500 rounded-full animate-ping absolute" />
            <Image src={chatIcon} alt="" className="w-1/2 h-1/2 invert" />
            <div className="w-[30%] h-[30%] bg-red-500 rounded-full absolute right-0 top-0"></div>
        </div>

        <div onClick={()=>setIsShown(false)} className={`z-20 w-full h-[100vh] backdrop-blur-sm fixed right-0 top-0 ${!isShown ? "translate-x-full" : "translate-x-0"}`}></div>
        
        <div id="chat" className={`
            z-30 w-full h-full sm:w-[30rem] fixed right-0 top-0 flex flex-col items-end p-1
            sm:rounded-s-lg bg-blue-500 dark:bg-blue-700 transition-transform duration-500 overflow-y-auto ${!isShown ? "translate-x-full" : "translate-x-0"}`}
        >
            <div className="p-1 flex gap-10">
                <div 
                    className="w-10 aspect-square bg-[--background2] rounded-lg cursor-pointer flex justify-center items-center font-bold text-xl text-white" 
                    onClick={() => showAlertBox(alertRef)}
                >
                    <Image src={ResetIcon} alt="" className="h-auto w-[80%] dark:invert"></Image>
                </div>

                <div 
                    className="w-10 aspect-square bg-red-700 rounded-lg cursor-pointer flex justify-center items-center font-bold text-xl text-white" 
                    onClick={()=>setIsShown(false)}
                >X</div>
            </div>
            <Chat />
        </div>

        <AlertBox onAccept={clearChatHistory} alertRef={alertRef} />
    </>
    );
}
