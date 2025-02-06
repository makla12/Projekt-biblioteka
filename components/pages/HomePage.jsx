'use client'

import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";
import ChatContainer from "../elements/ChatContainer";

export default function HomePage() {
	return (
	<>
		<ChatContainer />
        <NavBar curentSiteId={0} />
        
		<div className="w-full h-96"> </div>

        <Footer />
    </>
	);
}
