import ChatContainer from "../elements/chat/ChatContainer";
import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";
import Image from "next/image";
import Illustration from "@/public/book_power.png"

export default function HomePage() {
	return (
	<>
		<ChatContainer />
        <NavBar curentSiteId={0} />
        
		<div className="w-full h-96"> 
			<Image src={Illustration} alt="Book Power Image" className="w-[99%] sm:w-3/4 m-auto" ></Image>
		</div>

        <Footer />
    </>
	);
}
