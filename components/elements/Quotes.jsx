"use client"
import { useEffect, useState } from "react";

const Quotes = () => {
  const quotes = [
    "„Ludzie dobrze oczytani rzadziej są źli”. – Haruki Murakami",
    "„Czytanie przynosi nam nieznanych przyjaciół”. – Honoré de Balzac",
    "„To właśnie to, co czytasz, kiedy nie musisz, decyduje o tym, jaki będziesz, kiedy nie będziesz mógł nic na to poradzić”. – Oscar Wilde",
    "„Pokój bez książek jest jak ciało bez duszy”. – Cyceron",
    "„Człowiek, który nie czyta dobrych książek, nie ma żadnej przewagi nad człowiekiem, który nie potrafi ich czytać”. – Mark Twain",
    "„Czytelnik żyje tysiącem żyć, zanim umrze … . Człowiek, który nigdy nie czyta, żyje tylko jedno.” – George Martin",
    "„Ten, kto nie spodziewa się mieć miliona czytelników, nie powinien zabierać się do pisania.” – Johan W. Goethe"
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); // start fade-out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setVisible(true); // fade back in
      }, 500); // match transition
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    
    <div
    className={`transition-opacity duration-500 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
    }`}
    >
    {quotes[index]}
    </div>
  );
};

export default Quotes;
