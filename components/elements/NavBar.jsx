import Link from "next/link";

export default function NavBar({ curentSiteId }){

    return (
    <>
        <div className="w-full h-32 bg-[var(--background2)] flex flex-col justify-evenly items-center">
            <div>
                <div className="text-3xl text-blue-800 font-bold text-center">Electric library</div>
            </div>

            <div className="flex gap-5 text-lg font-bold">
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
