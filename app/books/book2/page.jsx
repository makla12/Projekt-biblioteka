import BookInfo from "@/components/pages/BookInfo";
import bookCover from "@/public/BookCovers/innsmouth.png";

export default function book(){return (<BookInfo {...{
    title: "Widmo nad Innsmouth",
    image: bookCover,
    author: "H.P. Lovecraft",
    date: "1931",
    type: "Horror",
    rating: "7,2/10",
    about: "„Widmo nad Innsmouth” to jedna z najbardziej mrocznych opowieści Lovecrafta. Młody badacz odkrywa przerażające tajemnice małego, odizolowanego miasteczka Innsmouth, którego mieszkańcy skrywają ponury sekret. Stopniowo wciągany w wir koszmaru, bohater uświadamia sobie, że nie wszystko, co ukryte w mroku, pozostaje tam na zawsze. To opowieść o pradawnych kultach, niewyobrażalnych istotach i losie gorszym od śmierci.",
    reviews:[
        { 
            "user": "Jan Kowalski",
            "date": "12-02-2024",
            "rating": "8/10",
            "review": "Mroczna i niepokojąca historia z duszną atmosferą. Lovecraft świetnie buduje napięcie i prowadzi czytelnika przez labirynt tajemnic Innsmouth. Choć język bywa archaiczny, klimat opowieści w pełni to rekompensuje."
        },

        { 
            "user": "Ionpe Dali",
            "date": "14-02-2024",
            "rating": "7/10",
            "review": "Świetny horror, choć miejscami ciężki w odbiorze. Lovecraft mistrzowsko kreuje klaustrofobiczną atmosferę, ale styl pisania może niektórych odstraszyć. Mimo to – warto!"
        },
        { 
            "user": "Michał Wiśniewski",
            "date": "16-02-2024",
            "rating": "9/10",
            "review": "Klasyka literatury grozy! Klimatyczne opisy, budowanie napięcia i przerażająca wizja miasteczka Innsmouth sprawiają, że to jeden z najlepszych tekstów Lovecrafta. Gorąco polecam!"
        }
    ],
}}/>)};