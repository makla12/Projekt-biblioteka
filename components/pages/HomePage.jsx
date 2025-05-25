import ChatContainer from "../elements/chat/ChatContainer";
import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";
import Image from "next/image";
import IllustrationDark from "@/public/book_power.png";
import IllustrationLight from "@/public/book_power_light.png";

export default function HomePage() {
	return (
	<>
		<ChatContainer />
        <NavBar curentSiteId={0} />
        
		<div className="w-full h-96 ">
                {/* Light mode image */}
                <div className="block dark:hidden w-[99%] sm:w-3/4 m-auto">
                    <Image
                        src={IllustrationLight} alt="Book Power"
                    />
                </div>

                {/* Dark mode image */}
                <div className="hidden dark:block w-[99%] sm:w-3/4 m-auto">
                    <Image
                        src={IllustrationDark} alt="Book Power"
                    />
                </div>
            </div>

        <Footer />
    </>
	);
}
