import { dialogs, firstMessages } from "./dialogs/dialogs";
import { executeActions } from "./dialogs/dialogFunctions";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import ChatBooba from "./ChatBooba";

const reverseArray = (array) => {
    let newArray = [];
    for (let i = array.length - 1; i >= 0; i--) {
        newArray.push(array[i]);
    }
    return newArray;
}
const arrayIncludesAll = (array, values) => values === undefined ? true : values.every((value) => array.includes(value));
const arrayNotIncludesAll = (array, values) => values === undefined ? true : values.every((value) => !array.includes(value));

function setLocalStorage(name, value) {
    localStorage.setItem(name, value);
}

function getLocalStorage(name) {
    let value = localStorage.getItem(name);
    if(value == "" || value == null) throw new Error("Data not Found");
    return value;
}

const updateChatHistory = (obj) => {
    try{
        setLocalStorage("chatHistory", JSON.stringify({ hist: [...JSON.parse(getLocalStorage("chatHistory")).hist, obj] }));
    }
    catch(error){
        window.location.reload();
    }
}

export default function Chat() {
    const [dialogPath, setDialogPath] = useState(null);
    const [inventory, setInventory] = useState(null);
    const [chatMessages, setChatMessages] = useState(null);

    const sendMessage = async (actions, message) => {
        updateChatHistory({ message: message, self: true });
        setChatMessages(prev => [...prev, { message: message, self: true }]);
        setDialogPath(null);
        const functionsAfter = executeActions(actions, message);
        for (const func of functionsAfter) await func({ setDialogPath, setChatMessages, setInventory });
    }

    useEffect(() => {
        try{
            setDialogPath(getLocalStorage("location"));
            setInventory(JSON.parse(getLocalStorage("inventory")).inv);
            setChatMessages(JSON.parse(getLocalStorage("chatHistory")).hist);
        }
        catch (error){
            setLocalStorage("location", "/startDialog");
            setLocalStorage("inventory", JSON.stringify({ inv: [] }));
            setLocalStorage("chatHistory", JSON.stringify({ hist: firstMessages }));
            setDialogPath("/startDialog");
            setInventory([]);
            setChatMessages(firstMessages);
        }
    }, []);

    return (
        <>
            <div className="w-full h-full felx flex-col-reverse justify-end p-2">
                <div className="w-full sm:h-[83vh] h-[77vh] overflow-y-auto flex flex-col-reverse gap-y-1 chatScroll bg-opacity-15 bg-zinc-300 rounded-3xl p-px pb-2">
                    {!chatMessages ? null :
                        reverseArray(chatMessages).map((value, index) => (
                            <ChatBooba key={index} {...value} />
                        ))}
                </div>

                <div className="w-full h-auto gap-5 flex items-center overflow-x-auto my-8 pb-2 chatScroll">
                    {!dialogPath ? null :
                        dialogs.filter((value) => value.path == dialogPath)
                            .filter(value => arrayIncludesAll(inventory, value.ifHas))
                            .filter(value => arrayNotIncludesAll(inventory, value.ifNotHas))
                            .sort((a, b) => b.priority - a.priority)
                            .map((value, index) =>
                                <ChatInput key={index} {...value} sendMessage={sendMessage} />
                            )}
                </div>
            </div>
        </>
    );
}
