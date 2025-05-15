import BookInfo from "@/components/pages/BookInfo";
import bookCover from "@/public/BookCovers/dziady2.png";

export default function book(){return (<BookInfo {...{
    "title": "Dziady cz. II",
    image: bookCover,
    "author": "Adam Mickiewicz",
    "date": "1823",
    "type": "Dramat romantyczny",
    "rating": "8,3/10",
    "about": "„Dziady cz. II” to jeden z kluczowych utworów romantyzmu polskiego. Akcja dzieje się w noc zaduszną, kiedy w obrzędzie dziadów młody bohater, Gustaw, przeżywa duchowe zmagania ze swoją przeszłością i miłością. W utworze pojawiają się postacie z zaświatów, które symbolizują rozmaite aspekty ludzkiego losu – cierpienie, niespełnione pragnienia, a także nadzieję na odkupienie. Dramat porusza temat wolności, miłości, śmierci i ofiary.",
    "reviews": [
        { 
            "user": "Katarzyna Kowalewska",
            "date": "15-02-2024",
            "rating": "8/10",
            "review": "Dziady cz. II to dramat pełen emocji i symboliki. Mickiewicz świetnie oddaje dylematy moralne bohaterów, a duchowe przeżycia Gustawa poruszają do głębi."
        },
        { 
            "user": "Łukasz Zieliński",
            "date": "17-02-2024",
            "rating": "9/10",
            "review": "Wspaniała pozycja, która idealnie łączy mroczny klimat z głębokimi pytaniami o życie, śmierć i sens ludzkiego istnienia. Dziady cz. II to prawdziwa perła literatury polskiej."
        },
        { 
            "user": "Agnieszka Wiśniewska",
            "date": "19-02-2024",
            "rating": "7/10",
            "review": "Pomimo że dzieło jest pełne głębokich refleksji, momentami trudno jest śledzić wszystkie wątki i symbolikę. Mimo to warto sięgnąć po ten dramat, zwłaszcza ze względu na jego wpływ na literaturę."
        }
    ]
}
}/>)};