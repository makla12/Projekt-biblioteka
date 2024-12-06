import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png"

export default function NavBar({ curentSiteId }){

    return (
    <>
        <div className="w-full h-32 bg-[var(--background2)] flex flex-col justify-evenly items-center">
            <div className="flex items-center">
                <Image src={logo} className="w-16 aspect-square" alt="Logo" />
                <div className="text-3xl text-blue-800 font-bold text-center">Electric library</div>
            </div>

            <div className="flex gap-5 text-lg font-bold text-center">
                <Link href="/" className={(curentSiteId == 0 ? "text-blue-600" : null)}> Strona główna </Link>
                <div>|</div>
                <Link href="/about" className={(curentSiteId == 1 ? "text-blue-600" : null)}> O nas </Link>
                <div>|</div>
                <Link href="/books" className={(curentSiteId == 2 ? "text-blue-600" : null)}> Nasze książki </Link>
                <div>|</div>
                <Link href="/techHelp" className={(curentSiteId == 3 ? "text-blue-600" : null)}> Pomoc techniczna </Link>
            </div>
        </div>
    </>
    );
}
