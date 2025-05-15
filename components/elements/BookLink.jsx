import Image from "next/image";
import Link from "next/link";

export default function BookLink({ href, name, image }){
    return(
    <>
        <Link href={href} className="w-64 flex items-center flex-col hover:cursor-pointer justify-between">
            <Image src={image} alt="" />
            <div className="text-xl font-bold">{name}</div>
        </Link>
    </>
    );
}
