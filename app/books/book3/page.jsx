import BookInfo from "@/components/pages/BookInfo";
import bookCover from "@/public/BookCovers/frankenstein.png";

export default function book(){return (<BookInfo {...{
    "title": "Frankenstein",
    image: bookCover,
    "author": "Mary Shelley",
    "date": "1818",
    "type": "Powieść gotycka, horror, science fiction",
    "rating": "8,1/10",
    "about": "„Frankenstein, czyli nowoczesny Prometeusz” to klasyczna powieść grozy i jedno z pierwszych dzieł science fiction. Opowiada historię młodego naukowca, Viktora Frankensteina, który w swojej obsesji na punkcie pokonania śmierci tworzy sztuczne życie. Eksperyment kończy się tragicznie, gdy jego dzieło – istota o nadludzkiej sile i inteligencji – zostaje odrzucone przez świat i popada w desperację. Powieść porusza temat granic nauki, moralności oraz konsekwencji ludzkiej pychy.",
    reviews:[
        { 
            "user": "Mistrz Odwrócony",
            "date": "05-02-2024",
            "rating": "9/10",
            "review": "Wraz z rokiem publikacji rozpoczyna się wolność"
        },
        { 
            "user": "Tomasz Grabowski",
            "date": "07-02-2024",
            "rating": "7/10",
            "review": "Świetny klimat gotyckiej grozy, ale momentami książka jest trudna w odbiorze. Mimo wszystko klasyka, którą warto znać!"
        },
        { 
            "user": "Ewa Lis",
            "date": "09-02-2024",
            "rating": "8/10",
            "review": "Frankenstein to coś więcej niż horror – to refleksja nad samotnością i odrzuceniem. Historia potwora wzrusza i przeraża jednocześnie."
        }
    ],
}}/>)};