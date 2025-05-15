import BookInfo from "@/components/pages/BookInfo";
import bookCover from "@/public/BookCovers/odyssey.png";

export default function book(){return (<BookInfo {...{
    "title": "Odyseja",
    image: bookCover,
    "author": "Homer",
    "date": "VIII wiek p.n.e.",
    "type": "Epos",
    "rating": "8,5/10",
    "about": "„Odyseja” to jedno z najważniejszych dzieł literatury światowej, opowiadające o pełnej przygód podróży Odyseusza do rodzinnej Itaki po zakończeniu wojny trojańskiej. Bohater przez dziesięć lat zmaga się z gniewem bogów, morskimi potworami i licznymi przeciwnościami losu. Po drodze spotyka m.in. cyklopa Polifema, czarodziejkę Kirke i syreny. Epos ukazuje zarówno siłę ludzkiego ducha, jak i znaczenie przebiegłości oraz sprytu w walce z przeciwnościami losu.",
    "reviews": [
        { 
            "user": "Marek Jastrzębski",
            "date": "10-02-2024",
            "rating": "9/10",
            "review": "Klasyk, który nigdy się nie starzeje. Odyseusz to bohater pełen wad i zalet, a jego podróż to metafora ludzkiego życia. Czyta się świetnie, choć archaiczny język może być wyzwaniem."
        },
        { 
            "user": "Natalia Rybak",
            "date": "12-02-2024",
            "rating": "8/10",
            "review": "Pełna przygód i mitologii opowieść, która wciąż inspiruje. Momentami opisy są długie, ale historia wynagradza każdą stronę."
        },
        { 
            "user": "Piotr Zieliński",
            "date": "14-02-2024",
            "rating": "7/10",
            "review": "Interesująca historia, choć miejscami trudna w odbiorze. Klasyczne motywy podróży i bohaterstwa sprawiają, że warto sięgnąć po ten epos."
        }
    ]
}}/>)};