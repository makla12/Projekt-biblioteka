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
    const [chatHisory, setChatHistory] = useState(null);
    const [dialogPath, setDialogPath] = useState(null);
    const [inventory, setInventory] = useState(null);
    
    useEffect(()=>{
        if(getCookie("location").length == 0 || getCookie("inventory").length == 0){
            setCookie("location", "/", 365);
            setCookie("inventory", JSON.stringify({inventory:[]}));
        }

        setDialogPath(getCookie("location"));
        setInventory(JSON.parse(getCookie("inventory")));
    },[]);

    useEffect(()=>{
        if(dialogPath){
            console.log(dialogs.filter(value => value.path == dialogPath));
        }
    },[dialogPath])
    
    return (
    <>
        <div className="w-full h-full felx flex-col-reverse justify-end p-2">
            <div className="w-full h-[86vh] bg-red-600 overflow-y-auto felx flex-row">
                <ChatBooba />
            </div>

            <div className="w-full h-[6%] p-1 gap-2 bg-green-600 flex overflow-x-auto mt-1">
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
