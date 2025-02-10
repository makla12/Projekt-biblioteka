import Image from "next/image";
import sendIcon from "@/public/send.svg";

export default function Chat() {
    return (
    <>
        <div className="w-full h-full felx flex-col-reverse justify-end">
            <form onSubmit={(e)=>{e.preventDefault()}}>
                <div className="w-full flex gap-2">
                    <input type="text" className="flex-grow bg-background rounded-md p-1" />
                    <button className="w-8 p-1 rounded-md aspect-square bg-background flex justify-center items-center">
                        <Image src={sendIcon} alt="" className="w-full h-full dark:invert" />
                    </button>
                </div>
            </form>
        </div>
    </>
    );
}
