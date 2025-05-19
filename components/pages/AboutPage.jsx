"use client";
import CursedEffect from "../elements/CursedEffect";
import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";
import ChatContainer from "../elements/chat/ChatContainer";

function AboutPage() {
	return (
		<div>
			<ChatContainer />
			<NavBar curentSiteId={1} />
			<div className="sm:px-16 px-2 py-4 ">
				<h2 className="text-3xl font-bold">Nasza biblioteka</h2>

				<p className="sm:w-[80%] w-[100%] p-2">
					<span><CursedEffect>Wierzymy, że </CursedEffect> nasza biblioteka to prawdziwa oaza spokoju i inspiracji.</span>
					<span> To właśnie stąd <CursedEffect>nasi</CursedEffect> drodzy <CursedEffect>czytelnicy</CursedEffect> wyruszają w niezapomniane podróże literackie, poszerzają horyzonty i znajdują cenne informacje.</span><br></br>
					<span>Staramy się, aby nasze zbiory były zawsze aktualne i różnorodne, bo wiemy, że apetyt na dobrą lekturę </span><CursedEffect>nigdy nie </CursedEffect>
					<span> maleje, a ciekawość świata jest nieograniczona. Dbamy o atmosferę sprzyjającą skupieniu, ale także twórczym dyskusjom.</span><br></br>
					<span> Jesteśmy przekonani, że z natłoku codziennych obowiązków i informacyjnego szumu z pewnością <CursedEffect>uciekną</CursedEffect> w kojące objęcia literatury, odnajdując u nas chwilę dla siebie. </span>
					<span> Nasze regały kryją tysiące opowieści: <CursedEffect>od </CursedEffect> klasycznych dzieł po najnowsze bestsellery, od literatury faktu po fantastykę.</span><br></br>
				</p>

				<p className="p-2">W <CursedEffect>naszych</CursedEffect> zasobach znajdują się między innymi:</p>

				<ul className="list-disc p-4 sm:m-2 m-5 mt-2">
					<li>bogaty wybór <CursedEffect>książek</CursedEffect> drukowanych dla dzieci, młodzieży i dorosłych</li>
					<li>zbiory audiowizualne i multimedialne</li>
					<li>czasopisma naukowe, popularnonaukowe oraz prasa codzienna</li>
					<li>bezpłatne stanowiska komputerowe z dostępem do Internetu</li>
				</ul>

				<p className="text-2xl font-bold">Godziny otwarcia naszej placówki:</p>

				<div className="sm:w-[80%] w-[100%] p-2">
					<p>Poniedziałek: <CursedEffect>6</CursedEffect>:00 – 1<CursedEffect>6</CursedEffect>:00</p>
					<p>Wtorek – Piątek: 9:00 – 19:00</p>
					<p>Sobota: 10:00 – 1<CursedEffect>6</CursedEffect>:00</p>
				</div>
				<p>Serdecznie zapraszamy do odwiedzin i korzystania z naszych zasobów!</p>
			</div>
			<Footer />
		</div>
	);
}

export default AboutPage;