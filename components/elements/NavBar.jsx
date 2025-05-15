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

            <div className="flex sm:gap-5 gap-2 text-lg font-bold text-center">
                <Link href="/" className={(curentSiteId == 0 ? "text-blue-600" : null)}> Strona główna </Link>

                <div className="w-[3px] h-full bg-[var(--foreground)]"></div>

                <Link href="/about" className={(curentSiteId == 1 ? "text-blue-600" : null)}> O nas </Link>

                <div className="w-[3px] h-full bg-[var(--foreground)]"></div>

                <Link href="/books" className={(curentSiteId == 2 ? "text-blue-600" : null)}> Nasze książki </Link>
            </div>
        </div>
    </>
    );
}
