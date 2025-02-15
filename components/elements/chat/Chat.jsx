import dialogs from "./dialogs";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import ChatBooba from "./ChatBooba";

const delay = ms => new Promise(res => setTimeout(res, ms));

const reverseArray = (array) => {
    let newArray = [];
    for(let i=array.length-1; i>=0; i--){
        newArray.push(array[i]);
    }
    return newArray;
}

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

const updateChatHistory = (obj) => {
    setCookie("chatHistory", JSON.stringify({hist:[...JSON.parse(getCookie("chatHistory")).hist, obj]}));
}

export default function Chat() {
    const [dialogPath, setDialogPath] = useState(null);
    const [inventory, setInventory] = useState(null);
    const [chatMessages, setChatMessages] = useState(null);

    const interpretAction = (actionList) => {
        const actions = actionList.split(";");

        const sendMessage = async (message) => {
            setChatMessages(prev => [...prev, {message:message, self:true}]);
            updateChatHistory({message:message, self:true});
            setDialogPath(null);
            //Save cookies
            actions.forEach(action => {
                const actionType = action.split(":")[0];
                const actionValue = action.split(":")[1];
                switch(actionType){
                    case "message":
                        updateChatHistory({message:actionValue, self:false});
                        break;
                    case "dialog":
                        setCookie("location", actionValue);
                        break;
                    default:
                        break;
                }
            });

            //Change visuals
            for(let i=0; i<actions.length; i++){
                const action = actions[i];
                const actionType = action.split(":")[0];
                const actionValue = action.split(":")[1];
                switch(actionType){
                    case "message":
                        await delay(500);
                        setChatMessages(prev => [...prev, {message:actionValue, self:false}]);
                        break;
                    case "dialog":
                        setDialogPath(actionValue);
                        break;
                    default:
                        break;
                }
            }
        };

        return sendMessage;
    };
    
    useEffect(()=>{
        if(getCookie("location").length == 0 || getCookie("inventory").length == 0 || getCookie("chatHistory").length == 0){
            setCookie("location", "/");
            setCookie("inventory", JSON.stringify({inv:[]}));
            setCookie("chatHistory", JSON.stringify({hist:[{message:"Pomożesz mi?", self:false}]}));
        }

        setDialogPath(getCookie("location"));
        setInventory(JSON.parse(getCookie("inventory")).inv);
        setChatMessages(JSON.parse(getCookie("chatHistory")).hist);
    },[]);

    useEffect(()=>{
        if(dialogPath){
            // dialogs.filter((value)=>value.path == dialogPath).map((value, index)=>{
            //     console.log(interpretAction(value.action));
            // });
            // console.log(chatMessages);
            // console.log(inventory);
        }
    },[dialogPath, chatMessages, inventory])
    
    return (
    <>
        <div className="w-full h-full felx flex-col-reverse justify-end p-2">
            <div className="w-full h-[83vh] overflow-y-auto flex flex-col-reverse gap-y-1 chatScroll">
                {!chatMessages ? null : 
                reverseArray(chatMessages).map((value, index)=>(
                    <ChatBooba key={index} {...value} />
                ))}
            </div>

            <div className="w-full h-auto gap-5 flex items-center overflow-x-auto my-8 pb-2 chatScroll justify-around">
            {!dialogPath ? null :
            dialogs.filter((value)=>value.path == dialogPath).map((value, index)=>
                <ChatInput key={index} {...value} interpretAction={interpretAction} />
            )}
            
            </div>
        </div>
    </>
    );
}
