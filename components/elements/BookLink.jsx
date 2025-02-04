import Image from "next/image";
import placeHolder from "@/public/placeHolderImage.png";
import Link from "next/link";

export default function BookLink({ href }){
    return(
    <>
        <Link href={href} className="w-64 h-[520px] flex items-center flex-col hover:cursor-pointer justify-between">
            <Image src={placeHolder} alt="" className="w-full h-[90%] bg-black" />
            <div className="text-xl font-bold">Nazwa książki</div>
        </Link>
    </>
    );
}