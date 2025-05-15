import ChatContainer from "../elements/chat/ChatContainer";
import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";

export default function AboutPage() {
	return (
	<>
		<ChatContainer />
        <NavBar curentSiteId={1} />

		<div className="w-full h-96"> </div>
		
		<Footer />
    </>
	);
}
