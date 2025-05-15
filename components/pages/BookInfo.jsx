import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";
import Review from "../elements/Review";
import Image from "next/image";
import backArrow from "@/public/back-arrow.svg";
import Link from "next/link";
import ChatContainer from "../elements/chat/ChatContainer";

export default function BookInfo({ title, author, date, type, rating, about, reviews, image }){
    return(
    <>
        <div className="w-full h-full top-0 left-0 bg-[var(--background)] fixed cursor-default overflow-x-auto">
            <ChatContainer />
            <NavBar curentSiteId={2} />

            <div className="h-auto sm:px-16 px-2 py-4 ">
                <div className="w-16">
                    <Link href={"/books"}>
                        <Image src={backArrow} alt="" className="w-full aspect-square cursor-pointer dark:invert" />
                    </Link>
                </div>

                <div className="w-full sm:px-20 px-2">
                    <div className="flex h-96 sm:flex-row flex-col items-center sm:mb-0 mb-52">
                        <Image src={image} alt="" className="w-72 h-96 mr-2" />
                        <div className="h-full flex flex-col justify-between py-2 text-2xl font-bold">
                            <div>{title}</div>
                            <div>Autor: {author}</div>
                            <div>Rok wydania: {date}</div>
                            <div>Gatunek: {type}</div>
                            <div>Ocena: {rating}</div>
                        </div>
                    </div>

                    <div className="mt-12 sm:px-12 px2">
                        <div className="text-3xl font-bold">O książce</div>
                        <div className="mt-4 mx-4">{about}</div>
                    </div>

                    <div className="mt-12 sm:px-12 px2">
                        <div className="text-3xl font-bold mb-10">Recenzje({reviews.length}):</div>

                        <div className="flex flex-col gap-8 ">
                            {reviews.map( (value, index) => <Review key={index} {...value}/> )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    </>
    );
}
