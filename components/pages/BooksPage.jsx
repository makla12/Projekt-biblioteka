import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";
import BookLink from "../elements/BookLink";

export default function BooksPage() {
  	return (
	<>
        <NavBar curentSiteId={2} />
        
		<div className="w-full h-auto px-12 py-5 flex justify-center gap-x-96 gap-y-20 flex-wrap">
			<BookLink href={"/books/book1"} />
			<BookLink href={"/books/book1"} />
			<BookLink href={"/books/book1"} />
			<BookLink href={"/books/book1"} />
			<BookLink href={"/books/book1"} />
			<BookLink href={"/books/book1"} />
		</div>

		<Footer />
    </>
	);
}
	