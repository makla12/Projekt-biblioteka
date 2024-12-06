import NavBar from "../elements/NavBar";
import Footer from "../elements/Footer";

export default function HomePage() {
  	return (
	<>
        <NavBar curentSiteId={0} />
        
		<div className="w-full h-96"> </div>

        <Footer />
    </>
  	);
}
