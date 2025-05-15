import BookInfo from "@/components/pages/BookInfo";
import bookCover from "@/public/BookCovers/wesele.png";

export default function book(){return (<BookInfo {...{
    "title": "Wesele",
    image: bookCover,
    "author": "Stanisław Wyspiański",
    "date": "1901",
    "type": "Dramat symboliczny",
    "rating": "8,7/10",
    "about": "„Wesele” to jedno z najważniejszych dzieł literatury polskiej, będące krytyką społeczną i narodową. Akcja dramatu toczy się podczas wesela inteligenta z chłopką, gdzie spotykają się przedstawiciele różnych warstw społecznych. W trakcie zabawy, w wyniku różnych symbolicznych wydarzeń, Wyspiański ukazuje polski narodowy kryzys tożsamości, marzenia o niepodległości oraz niemożność prawdziwej jedności. „Wesele” jest bogate w symbole, odnoszące się do historii Polski, a także do kondycji społecznej i politycznej kraju.",
    "reviews": [
        { 
            "user": "Marek Nowak",
            "date": "20-02-2024",
            "rating": "9/10",
            "review": "„Wesele” to prawdziwa uczta intelektualna. Wyspiański pokazuje zarówno piękno, jak i mroki polskiego społeczeństwa. Symbolika i głębokie refleksje są nieocenione, a sama historia jest jednocześnie dramatyczna i pełna nadziei."
        },
        { 
            "user": "Karolina Nowakowska",
            "date": "22-02-2024",
            "rating": "8/10",
            "review": "Piękne, choć miejscami trudne w odbiorze. Wesele ukazuje polski narodowy mit, ale również rzeczywistość, która nie pozwala na realizację marzeń o wolności. Ciekawe postacie i ich symboliczne znaczenie."
        },
        { 
            "user": "Tomasz Kwiatkowski",
            "date": "24-02-2024",
            "rating": "8/10",
            "review": "Dramat pełen pasji, kontrastów i symboliki. Wyspiański znakomicie ukazuje psychologię postaci, a same wydarzenia nabierają głębokiego, filozoficznego wymiaru. Jednak dla niektórych trudne do zrozumienia."
        }
    ]
}
}/>)};