import BookInfo from "@/components/pages/BookInfo";
import bookCover from "@/public/BookCovers/hound.png"

export default function book(){return (<BookInfo {...{
    title: "Pies Baskerville’ów",
    image: bookCover,
    author: "Arthur Ignatius Conan Doyle",
    date: "1901-1902",
    type: "powieść detektywistyczna",
    rating: "7,4/10",
    about: "W „Psie Baskervillów” Sherlock Holmes i doktor Watson szukają sprawców morderstw w rodzie Baskervillów. Metodycznie tropią straszliwą bestię i zimnego mordercę, narażając się na mrożące krew w żyłach niebezpieczeństwa na bagnach Grimpen Mire. ",
    reviews:[
        { 
            "user": "Anna Nowak",
            "date": "18-02-2024",
            "rating": "9/10",
            "review": "Jedna z moich ulubionych książek Doyle’a! Mroczny klimat, tajemnica i świetne prowadzenie akcji. Polecam każdemu fanowi detektywistycznych zagadek."
        },

        { 
            "user": "Jan Kowalski",
            "date": "15-02-2024",
            "rating": "7/10",
            "review": "Ciekawa historia, dobrze poprowadzona intryga, ale momentami zbyt rozwlekłe opisy. Klimat powieści jednak rekompensuje te drobne mankamenty."
        },
        { 
            user:"Niku Tasem",
            date:"12-02-2024",
            rating:"8/10",
            review: "Z każdym kolejnym przeczytanym tomem coraz bardziej rozumiem czemu ta seria jest ponadczasowa. ",
        }
    ],
}}/>)};