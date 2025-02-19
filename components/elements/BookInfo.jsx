import NavBar from "./NavBar";
import Footer from "./Footer";
import Review from "./Review";
import Image from "next/image";
import backArrow from "@/public/back-arrow.svg";
import placeHolder from "@/public/placeHolderImage.png";
import Link from "next/link";

export default function BookInfo({ title, author, date, type, rating, about, reviews }){
    return(
    <>
        <div className="w-full h-full top-0 left-0 bg-[var(--background)] fixed cursor-default overflow-x-scroll">
            <NavBar curentSiteId={2} />

            <div className="h-auto px-16 py-4">
                <div className="w-16">
                    <Link href={"/books"}>
                        <Image src={backArrow} alt="" className="w-full aspect-square cursor-pointer" />
                    </Link>
                </div>

                <div className="w-full px-20">
                    <div className="flex h-96">
                        <Image src={placeHolder} alt="" className="w-72 h-full mr-2" />
                        
                        <div className="h-full flex flex-col justify-between py-2 text-2xl font-bold">
                            <div>{title}</div>
                            <div>Autor: {author}</div>
                            <div>Rok wydania: {date}</div>
                            <div>Gatunek: {type}</div>
                            <div>Ocena: {rating}</div>
                        </div>
                    </div>

                    <div className="mt-12 px-12">
                        <div className="text-3xl font-bold">O książce</div>
                        <div className="mt-4 mx-4">{about}</div>
                    </div>

                    <div className="mt-12 px-12">
                        <div className="text-3xl font-bold mb-10">Recenzje({reviews.length}):</div>

                        <div className="flex flex-col gap-8">
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