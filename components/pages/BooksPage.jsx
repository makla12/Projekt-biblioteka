import ChatContainer from "../elements/chat/ChatContainer";
import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";
import BookLink from "../elements/BookLink";
import houndCover from "@/public/BookCovers/hound.png";
import innsmouthCover from "@/public/BookCovers/innsmouth.png";
import frankensteinConver from "@/public/BookCovers/frankenstein.png";
import odysseyCover from "@/public/BookCovers/odyssey.png";
import dziady2Conver from "@/public/BookCovers/dziady2.png";
import weseleCover from "@/public/BookCovers/wesele.png";

export default function BooksPage() {
	return (
	<>
		<ChatContainer />
        <NavBar curentSiteId={2} />
        
		<div className="w-full h-auto px-12 py-5 flex justify-center gap-x-96 gap-y-20 flex-wrap">
			<BookLink href={"/books/book1"} name={"Pies Baskerville’ów"} image={houndCover}/>
			<BookLink href={"/books/book2"} name={"Widmo nad Innsmouth"} image={innsmouthCover} />
			<BookLink href={"/books/book3"} name={"Frankenstein"} image={frankensteinConver} />
			<BookLink href={"/books/book4"} name={"Odyseja"} image={odysseyCover} />
			<BookLink href={"/books/book5"} name={"Dziady cz. II"} image={dziady2Conver} />
			<BookLink href={"/books/book6"} name={"Wesele"} image={weseleCover} />
		</div>

		<Footer />
    </>
	);
}
