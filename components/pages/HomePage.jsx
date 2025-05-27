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
        
		<div className="w-full h-auto pb-5 pt-7 ">
            <div className="block dark:hidden sm:w-3/4 m-auto "> {/*light mode*/}
                <Image className="w-full"
                    src={IllustrationLight} alt="Book Power"
                />
            </div>
            <div className="hidden dark:block sm:w-3/4 m-auto ">  {/*dark mode*/}
                <Image className="w-full"
                    src={IllustrationDark} alt="Book Power"
                />
            </div>
        </div>
        <div className="w-full h-auto bg-blue-800  text-center py-7">
            <h1 className="w-full text-5xl font-bold ">
                Biblioteka z Energią!
            </h1>
        </div>
        <div className="h-auto flex justify-between sm:flex-row flex-col py-6">
            <div className="bg-[var(--background2)] mx-auto sm:w-[40vw] w-[90vw] h-100% rounded-xl p-9 sm:text-[1.5vw] text-[3.5vw] sm:my-0 my-3">
                <p>
                    <b>Decydujesz, co przeczytać w następnej kolejności?</b><br></br><br></br>
                    Jesteś we właściwym miejscu. Powiedz nam, jakie tytuły 
                    lub gatunki podobały ci się w przeszłości, a my przedstawimy 
                    ci zaskakująco wnikliwe rekomendacje.
                </p>
            </div>
            <div className="bg-[var(--background2)] mx-auto sm:w-[40vw] w-[90vw] h-100% rounded-xl p-9 sm:text-[1.5vw] text-[3.5vw] sm:my-0 my-3">
                
                    <h2><b>Zapraszamy do biblioteki!</b></h2><br></br>
                    <span >Szukasz spokojnego miejsca, gdzie możesz popracować, pouczyć się albo spędzić czas z kolegami? Biblioteka to idealne miejsce!</span><br></br>
                    <span>Możesz przyjść sam albo z grupą znajomych.</span><br></br>
                    {/* <ul className="list-disc px-4 ">

                        <li>ciche strefy do nauki i pracy</li>

                        <li>dostęp do komputerów i internetu</li>

                        <li>gry planszowe, przy których można się zrelaksować i miło spędzić czas</li>

                        <li>przyjazną atmosferę sprzyjającą zarówno skupieniu, jak i rozmowie</li>
                    </ul> */}

                    <span>Nie trzeba się zapisywać — wystarczy przyjść</span>
               
            </div>
           
        </div>

        <Footer />
    </>
	);
}
