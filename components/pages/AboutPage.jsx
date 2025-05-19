// import AboutPage from './about';
import AboutUsTextRenderer from "../elements/AboutUsTextRenderer";
import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";
import ChatContainer from "../elements/chat/ChatContainer";

function SomeOtherComponent() {
 

  return (
    <div>
		<ChatContainer />
		<NavBar curentSiteId={1} />
		<div className="h-auto sm:px-16 px-2 py-4 ">
			<AboutUsTextRenderer>
				<h2 className="text-3xl font-bold">Nasza biblioteka</h2>
				<p className="sm:w-[80%] w-[100%] sm:h-40 h-auto p-2">
					<span><span className="cursed">Wierzymy, że </span> nasza biblioteka to prawdziwa oaza spokoju i inspiracji.</span>
					<span> To właśnie stąd <span className="cursed">nasi</span> drodzy <span className="cursed">czytelnicy</span> wyruszają w niezapomniane podróże literackie, poszerzają horyzonty i znajdują cenne informacje.</span><br></br>
					<span>Staramy się, aby nasze zbiory były zawsze aktualne i różnorodne, bo wiemy, że apetyt na dobrą lekturę </span><span className="cursed">nigdy nie </span>
					<span> maleje, a ciekawość świata jest nieograniczona. Dbamy o atmosferę sprzyjającą skupieniu, ale także twórczym dyskusjom.</span><br></br>
					<span> Jesteśmy przekonani, że z natłoku codziennych obowiązków i informacyjnego szumu z pewnością <span className="cursed">uciekną</span> w kojące objęcia literatury, odnajdując u nas chwilę dla siebie. </span>
					<span> Nasze regały kryją tysiące opowieści: <span className="cursed">od </span> klasycznych dzieł po najnowsze bestsellery, od literatury faktu po fantastykę.</span><br></br> 
				</p>
				<div className="sm:w-[80%] w-[100%] sm:h-40 h-auto p-2">
					<p>W <span className="cursed">naszych</span> zasobach znajdują się między innymi:</p>
					<ul className="list-disc sm:w-[80%] w-[90%]  h-auto p-2 sm:m-2 m-5 mt-2">
						<li>bogaty wybór <span className="cursed">książek</span> drukowanych dla dzieci, młodzieży i dorosłych</li>
						<li>zbiory audiowizualne i multimedialne</li>
						<li>czasopisma naukowe, popularnonaukowe oraz prasa codzienna</li>
						<li>bezpłatne stanowiska komputerowe z dostępem do Internetu</li>
					</ul>
					<p className="text-2xl font-bold">Godziny otwarcia naszej placówki:</p>
					<div className="sm:w-[80%] w-[100%] sm:h-40 h-auto p-2">
						<p>Poniedziałek: <span className="cursed">6</span>:00 – 1<span className="cursed">6</span>:00</p>
						<p>Wtorek – Piątek: 9:00 – 19:00</p>
						<p>Sobota: 10:00 – 1<span className="cursed">6</span>:00</p>
					</div>
					<p>Serdecznie zapraszamy do odwiedzin i korzystania z naszych zasobów!</p>
				</div>
			</AboutUsTextRenderer>
		</div>
      	<Footer/>
    </div>
  );
}

export default SomeOtherComponent;