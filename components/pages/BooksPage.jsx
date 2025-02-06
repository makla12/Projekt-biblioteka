import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";
import BookLink from "../elements/BookLink";
import placeHolder from "@/public/placeHolderImage.png";

export default function BooksPage() {
	return (
	<>
        <NavBar curentSiteId={2} />
        
		<div className="w-full h-auto px-12 py-5 flex justify-center gap-x-96 gap-y-20 flex-wrap">
			<BookLink href={"/books/book1"} name={"Książka"} image={placeHolder} />
			<BookLink href={"/books/book2"} name={"Książka"} image={placeHolder} />
			<BookLink href={"/books/book3"} name={"Książka"} image={placeHolder} />
			<BookLink href={"/books/book4"} name={"Książka"} image={placeHolder} />
			<BookLink href={"/books/book5"} name={"Książka"} image={placeHolder} />
			<BookLink href={"/books/book6"} name={"Książka"} image={placeHolder} />
		</div>

		<Footer />
    </>
	);
}
