import Image from "next/image";
import Link from "next/link";

export default function BookLink({ href, name, image }){
    return(
    <>
        <Link href={href} className="w-64 h-[520px] flex items-center flex-col hover:cursor-pointer justify-between">
            <Image src={image} alt="" className="w-full h-[90%]" />
            <div className="text-xl font-bold">{name}</div>
        </Link>
    </>
    );
}
