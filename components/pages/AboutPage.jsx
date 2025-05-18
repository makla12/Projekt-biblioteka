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
      	<AboutUsTextRenderer>
			<p>
				<span><span className="cursed">Wierzymy, że </span> nasza biblioteka to prawdziwa oaza spokoju i inspiracji.</span>
				<span> To właśnie stąd <span className="cursed">nasi</span> drodzy <span className="cursed">czytelnicy</span> wyruszają w niezapomniane podróże literackie, poszerzają horyzonty i znajdują cenne informacje.</span><br></br>
				<span>Staramy się, aby nasze zbiory były zawsze aktualne i różnorodne, bo wiemy, że apetyt na dobrą lekturę </span><span className="cursed">nigdy nie </span>
				<span> maleje, a ciekawość świata jest nieograniczona. Dbamy o atmosferę sprzyjającą skupieniu, ale także twórczym dyskusjom.</span><br></br>
				<span> Jesteśmy przekonani, że z natłoku codziennych obowiązków i informacyjnego szumu z pewnością<span className="cursed">uciekną</span> w kojące objęcia literatury, odnajdując u nas chwilę dla siebie. </span>
				<span> Nasze regały kryją tysiące opowieści: <span className="cursed">od </span> klasycznych dzieł po najnowsze bestsellery, od literatury faktu po fantastykę.</span><br></br> 
			</p>

			<p>W naszych zasobach znajdują się między innymi:</p>
			<ul>
				<li>– bogaty wybór książek drukowanych dla dzieci, młodzieży i dorosłych,</li>
				<li>– zbiory audiowizualne i multimedialne,</li>
				<li>– czasopisma naukowe, popularnonaukowe oraz prasa codzienna,</li>
				<li>– bezpłatne stanowiska komputerowe z dostępem do Internetu.</li>
			</ul>
			<p>Regularnie organizujemy również spotkania autorskie, warsztaty literackie oraz wystawy tematyczne. Chcemy być miejscem żywym, tętniącym kulturą i otwartym na potrzeby wszystkich mieszkańców.</p>
			<p>Godziny otwarcia naszej placówki:</p>
			<p>Poniedziałek – Piątek: 9:00 – 19:00</p>
			<p>Sobota: 10:00 – 14:00</p>
			<p>Serdecznie zapraszamy do odwiedzin i korzystania z naszych zasobów!</p>
		</AboutUsTextRenderer>
      	<Footer />
    </div>
  );
}

export default SomeOtherComponent;