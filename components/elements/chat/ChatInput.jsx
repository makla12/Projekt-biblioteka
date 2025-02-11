import sendIcon from "@/public/send.svg";
import Image from "next/image";

export default function ChatInput({isInput, description}){
    return(
    <>
    {isInput ? (

    <form className="w-full h-full" onSubmit={(e)=>{e.preventDefault()}}>
        <div className="w-full h-full flex gap-2">
            <input placeholder={description} type="text" className="w-full h-[5vh] self-center bg-background rounded-md p-1" />
            <button className="w-[10%] h-full p-1 rounded-md bg-background flex justify-center items-center">
                <Image src={sendIcon} alt="" className="w-full h-full dark:invert" />
            </button>
        </div>
    </form>

    ) : (

    <button className="w-auto h-full flex-shrink-0 bg-background rounded-md p-1 border-2 font-bold text-xl">
        {description}
    </button>

    )}    
    </>
    )
}