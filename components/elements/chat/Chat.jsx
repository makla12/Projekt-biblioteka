import dialogs from "./dialogs";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import ChatBooba from "./ChatBooba";

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default function Chat() {
    const [dialogPath, setDialogPath] = useState(null);
    const [inventory, setInventory] = useState(null);
    const [chatHistory, setChatHistory] = useState(null);
    
    useEffect(()=>{
        if(getCookie("location").length == 0 || getCookie("inventory").length == 0 || getCookie("chatHistory")){
            setCookie("location", "/", 365);
            setCookie("inventory", JSON.stringify({inv:[]}));
            setCookie("chatHistory", JSON.stringify({hist:[]}));
        }

        setDialogPath(getCookie("location"));
        setInventory(JSON.parse(getCookie("inventory")).inv);
        setChatHistory(JSON.parse(getCookie("chatHistory")).hist);
    },[]);

    useEffect(()=>{
        if(dialogPath){
            console.log(dialogs);
            console.log(chatHistory);
            console.log(inventory);
        }
    },[dialogPath, chatHistory, inventory])
    
    return (
    <>
        <div className="w-full h-full felx flex-col-reverse justify-end p-2">
            <div className="w-full h-[86vh] overflow-y-auto flex flex-col-reverse gap-y-1">
                <div className="w-fit max-w-64 h-auto bg-blue-400 dark:bg-blue-500 py-2 px-4 rounded-3xl text-lg self-end">Halo jest tam kotoś</div>
                <div className="w-fit max-w-64 h-auto bg-slate-300 dark:bg-zinc-800 py-2 px-4 rounded-3xl text-lg">Halo jest tam kotoś</div>
            </div>

            <div className="w-full h-[6%] p-1 gap-5 flex items-center overflow-x-auto mt-1">
            {!dialogPath ? null :
            <>
                {/* <ChatInput isInput={false} description={"dsajdashg"} />
                <ChatInput isInput={false} description={"dsajdashg"} />
                <ChatInput isInput={false} description={"dsajdashg"} /> */}
                <ChatInput isInput={true} description={"dsajdashg"} />
            </>
            }
            
            </div>
        </div>
    </>
    );
}
