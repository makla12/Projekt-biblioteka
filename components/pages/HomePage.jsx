import ChatContainer from "../elements/chat/ChatContainer";
import Image from "next/image";
import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";
import Quotes from "../elements/Quotes";
import BookLink from "../elements/BookLink";
import frankensteinConver from "@/public/BookCovers/frankenstein.png";
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

        <div className="w-full h-auto text-white bg-blue-800  text-center py-7">

            <h1 className="w-full text-5xl font-bold ">
                Biblioteka z Energią!
            </h1>

        </div>

        <div className="h-auto flex justify-between sm:flex-row flex-col py-6">

            <div className="bg-[var(--background2)] mx-auto sm:w-[40vw] w-[90vw] h-100% rounded-xl p-9 sm:text-[1.5vw] text-[4.5vw] sm:my-0 my-3">
                <p>
                    <b>Decydujesz, co przeczytać w następnej kolejności?</b><br></br><br></br>
                    Jesteś we właściwym miejscu. Powiedz nam, jakie tytuły 
                    lub gatunki podobały ci się w przeszłości, a my przedstawimy 
                    ci zaskakująco wnikliwe rekomendacje.
                </p>
            </div>

            <div className="bg-[var(--background2)] mx-auto sm:w-[40vw] w-[90vw] h-100% rounded-xl p-9 sm:text-[1.5vw] text-[4.5vw] sm:my-0 my-3">
                <h2><b>Zapraszamy do biblioteki!</b></h2><br></br>
                <span >Szukasz spokojnego miejsca, gdzie możesz popracować, pouczyć się albo spędzić czas z kolegami? Biblioteka to idealne miejsce!</span><br></br>
                <span>Możesz przyjść sam albo z grupą znajomych.</span><br></br>
                <span>Nie trzeba się zapisywać — wystarczy przyjść</span>
            </div>

        </div>

        <div className="w-full h-auto text-white bg-blue-800 text-center py-7">
            <h1 className="w-full text-5xl font-bold ">
                Nowość!
            </h1>
        </div>
        
        <div className="flex sm:flex-row flex-col-reverse my-[4vh]">

            <div className="flex flex-col justify-between">
                <div className="bg-[var(--background2)] rounded-xl sm:w-[50vw] w-[90vw] h-[20vh] sm:ml-[20vh] mx-auto px-9 pt-2 pb-7 sm:text-[1.5vw] text-[4.5vw] ">
                    <p className="text-center"><b>Cytaty</b></p>
                    <Quotes></Quotes>
                </div>

                <div className="sm:w-[50vw] w-[90vw] h-auto sm:ml-[20vh] mx-auto px-9 pt-2 pb-7 my-5 sm:text-[1.5vw] text-[4.5vw] sm:border-t-4 border-0 border-blue-800">
                    <p><b>Sekrety Zaklęte w Literach: Poznaj Świat Szyfrów!</b><br></br><br></br>

                    <span>Od wieków ludzie używali szyfrów do ochrony swoich tajemnic. To fascynujący świat ukrywania znaczenia wiadomości,</span> 
                    <span>gdzie każda litera może skrywać coś więcej.</span><br></br>
                    <span>Jednym z najstarszych jest szyfr Cezara. Wyobraź sobie, że każdą literę w wiadomości przesuwasz o kilka miejsc w alfabecie</span>
                    <span>- na przykład &quot;A&quot; staje się &quot;D&quot;.</span>
                    <span>Juliusz Cezar używał tej metody do tajnej korespondencji!</span> 
                    <span>Aby odczytać taką wiadomość, trzeba znać sekretne przesunięcie.</span>

                    Choć prosty, szyfr Cezara to początek fascynującej dziedziny kryptografii. Odkryj więcej o sztuce szyfrowania w naszych zbiorach bibliotecznych!</p>
                </div>

            </div>

            <div className="mx-auto sm:w-[30vw] w-[90vw] h-100% p-9 sm:text-[1.5vw] text-[4.5vw] sm:my-0 my-3 sm:border-l-2 border-0 border-[var(--foreground)]">
                <h2><b>BESTSELLER</b></h2><br></br>
                <BookLink href={"/books/book3"} name={"Frankenstein"} image={frankensteinConver} />
                <p className="text-center w-[256px]">Mary Shelley</p>
            </div>

        </div>

        <Footer />
    </>
	);
}
