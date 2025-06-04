import { message, goToDialogPath, giveItem, checkInventory, solvePuzzle } from "./dialogFunctions";
import { endMessages } from "./endDialog";

const dialogsSala214 = [
    // === SALA 214 (/sala/214) - WEJŚCIE I PODSTAWOWA EKSPLORACJA ===
    {
        description: "Opisz mi jak wygląda sala.",
        isInput: false,
        path: "/sala/214",
        ifNotHas: ["asked_to_look_around_214"],
        priority: 2,
        actions: [
            () => message("Widzę dużo ławek ustawionych w rzędach, tradycyjnie. Na ścianie wiszą dwa obrazy. Jest też biurko nauczycielskie, a w nim jedna szafka jest zamknięta na kłódkę."),
            () => giveItem("asked_to_look_around_214"),
            () => goToDialogPath("/sala/214"),
        ]
    },
    {
        description: "Przyjrzyj się obrazom na ścianie.",
        isInput: false,
        path: "/sala/214",
        ifHas: ["asked_to_look_around_214"],
        priority: 2,
        actions: [
            () => message("Pierwszy obraz to zwykły pałac nic specjalnego. Drugi obraz to portret Juliusza Cezara. Standardowy portret, ale w rogu jest wyryty numer 'III' może to coś ważnego"),
            () => checkInventory(["sala214_pytanie_rozszyfrowane"], [ 
                () => message("Raczej to już się nam nie przyda."),
                () => goToDialogPath("/sala/214"),
            ]),
            () => goToDialogPath("/sala/214"), // Jeśli nie ma "sala214_pytanie_rozszyfrowane", to też wracamy
        ]
    },
    {
        description: "Podejdz do biurka nauczycielskiego.",
        isInput: false,
        path: "/sala/214",
        ifHas: ["asked_to_look_around_214"],
        priority: 3,
        actions: [
            () => message("Jestem przy biurku. Na blacie leży trochę kartek. Szuflady są w większości puste ale jest też ta jedna zamknięta na kłódkę."),
            () => goToDialogPath("/sala/214/biurko"),
        ]
    },
    {
        description: "Poszukaj czegoś nietypowego na ławkach.",
        isInput: false,
        path: "/sala/214",
        ifHas: ["asked_to_look_around_214"],
        ifNotHas: ["sala214_szyfr_znaleziony"],
        priority: 2,
        actions: [
            () => message("Chwila... Tak! Na jednej z ławek w ostatnim rzędzie leży kartka. Jest na niej wydrukowany napis: MDND MHVW GDWD SRZVWDQLD VCNROB?. Wygląda jak bazgroły, ale może to jakaś zaszyfrowana wiadomość?"),
            () => giveItem("sala214_szyfr_znaleziony"),
            () => goToDialogPath("/sala/214"),
        ]
    },

    // === SALA 214 (/sala/214/biurko) - INTERAKCJA PRZY BIURKU ===
    {
        description: "Przyjrzyj się tym kartkom",
        isInput: false,
        path: "/sala/214/biurko",
        ifNotHas: ["sala214_latin_sheet_read"],
        priority: 1,
        actions: [
            () => message("Jest na niej napisane: veni vidi vici. To chyba coś po łacinie, ale nie wiem co to znaczy. Może to jakaś podpowiedź do zagadki?"),
            () => giveItem("sala214_latin_sheet_read"),
            () => checkInventory(["sala214_pytanie_rozszyfrowane"], [
                () => message("Wydaje mi się, że to już nie będzie nam potrzebne."),
                () => goToDialogPath("/sala/214/biurko"),
            ]),
            () => goToDialogPath("/sala/214/biurko"),
        ]
    },
    {
        description: "Co było na tej kartce?", // Opcja przypomnienia
        isInput: false,
        path: "/sala/214/biurko",
        ifHas: ["sala214_latin_sheet_read"],
        priority: 2, // Niższy priorytet niż pierwszorazowe przeczytanie
        actions: [
            () => message("Na kartce jest napisane: veni vidi vici. Brzmi jak jakaś podpowiedź."),
            () => checkInventory(["sala214_pytanie_rozszyfrowane"], [
                () => message("Wydaje mi się, że to już nie będzie nam potrzebne."),
                () => goToDialogPath("/sala/214/biurko"),
            ]),
            () => goToDialogPath("/sala/214/biurko"),
        ]
    },
    {
        description: "Przyjrzyj się zamkniętej szafce",
        isInput: false,
        path: "/sala/214/biurko",
        priority: 1,
        ifNotHas: ["sala214_szafka_otwarta"], // Ukryj, jeśli szafka już otwarta
        actions: [
            () => message("To szafka z kłódką. Wygląda na solidną, nie ma szans, żeby otworzyć ją bez klucza lub kodu."),
            () => goToDialogPath("/sala/214/biurko"),
        ]
    },
    {
        description: "Odejdź od biurka.",
        isInput: false,
        path: "/sala/214/biurko",
        priority: 1,
        actions: [
            () => message("Dobra, odchodzę od biurka."),
            () => goToDialogPath("/sala/214"),
        ]
    },

    // === SALA 214 (/sala/214) - INTERAKCJA Z SZYFREM (po jego znalezieniu) ===
    {
        description: "Chyba rozszyfrowałem tą wiadomość.",
        isInput: false,
        path: "/sala/214",
        ifHas: ["sala214_szyfr_znaleziony"],
        ifNotHas: ["sala214_pytanie_rozszyfrowane"],
        priority: 3, // Wyższy priorytet, gdy gracz ma szyfr
        actions: [
            () => message("Świetnie! Jestem bardzo ciekawy. Jak brzmi rozszyfrowana wiadomość?"),
            () => goToDialogPath("/sala/214/podaj_rozszyfrowana_wiadomosc"),
        ]
    },
    {
        description: "Przeczytaj mi ten napis z kartki jeszcze raz.",
        isInput: false,
        path: "/sala/214",
        ifHas: ["sala214_szyfr_znaleziony"],
        ifNotHas: ["sala214_pytanie_rozszyfrowane"],
        priority: 3,
        actions: [
            () => message("Jasne. Napis to: MDND MHVW GDWD SRZVWDQLD VCNROB?. Może w bibliotece jest jakaś książka która może nam pomóc? Albo ten portret Cezara i napis 'III' coś znaczą?"),
            () => goToDialogPath("/sala/214"),
        ]
    },

    // === SALA 214 (/sala/214/podaj_rozszyfrowana_wiadomosc) - GRACZ WPISUJE ROZSZYFROWANE PYTANIE ===
    {
        description: "Wpisz rozszyfrowaną wiadomość:",
        isInput: true,
        path: "/sala/214/podaj_rozszyfrowana_wiadomosc",
        priority: 1,
        actions: [
            ({messageInput}) => solvePuzzle("JAKA JEST DATA POWSTANIA SZKOLY", messageInput.toUpperCase().replace("?", "").trim(), {
                success: [
                    () => message("Niesamowite! 'JAKA JEST DATA POWSTANIA SZKOŁY?' To musi być to! Teraz tylko trzeba znaleźć tę datę..."),
                    () => giveItem("sala214_pytanie_rozszyfrowane"),
                    () => checkInventory(["elektryk_1965_sheet_read"], [
                        () => message("Chwila... pamiętam tę kartkę z biurka w bibliotece! Było na niej 'ELEKTRYK-1965'!"),
                        () => goToDialogPath("/sala/214"),
                    ]),
                    // Jeśli nie czytał kartki, to poniższy message się wykona
                    () => message("Hmm, gdzie mogliśmy widzieć datę powstania szkoły? Może w bibliotece coś było?"),
                    () => goToDialogPath("/sala/214"),
                ],
                fail: [
                    () => message(`Hmm, "${messageInput}"... Coś mi tu nie pasuje. Sprawdź jeszcze raz szyfr, portret Cezara i notatkę 'veni vidi vici'. Może drobny błąd?`),
                    () => goToDialogPath("/sala/214"),
                ],
            }),
        ]
    },

    // === SALA 214 (/sala/214 lub /sala/214/biurko) - PO ROZSZYFROWANIU PYTANIA ===
    {
        description: "Wpisz kod do szafki", // Ta opcja powinna być dostępna przy biurku
        isInput: false,
        path: "/sala/214/biurko",
        priority: 3, // Wyższy priorytet, gdy pytanie jest znane
        ifHas: ["sala214_pytanie_rozszyfrowane"],
        ifNotHas: ["sala214_szafka_otwarta"],
        actions: [
            () => message("Okej, jaki kod mam wpisać?"),
            () => goToDialogPath("/sala/214/kod_szafki"),
        ]
    },
    {
        description: "Gdzie może być ta data? (Przypomnij)",
        isInput: false,
        path: "/sala/214", // Dostępna ogólnie w sali
        priority: 3,
        ifHas: ["sala214_pytanie_rozszyfrowane"],
        ifNotHas: ["sala214_szafka_otwarta"],
        actions: [
            () => checkInventory(["elektryk_1965_sheet_read"], [
                () => message("Pamiętasz tę kartkę z biurka w bibliotece? Było na niej 'ELEKTRYK-1965' i dopisek 'pamiętaj o dacie od której wszystko się zaczeło'."),
                () => goToDialogPath("/sala/214"),
            ]),
            // Jeśli nie czytał kartki:
            () => message("Data powstania szkoły... Może na jakiejś tablicy pamiątkowej? Albo w kronice szkolnej? Często takie informacje są w bibliotece."),
            () => goToDialogPath("/sala/214"),
        ]
    },

    // === SALA 214 (/sala/214/kod_szafki) - GRACZ WPISUJE DATĘ (KOD DO KŁÓDKI) ===
    {
        description: "Wpisz kod:",
        isInput: true,
        path: "/sala/214/kod_szafki",
        priority: 1,
        actions: [
            ({messageInput}) => solvePuzzle("1965", messageInput.trim(), {
                success: [
                    () => message(`Wpisuję ${messageInput}... Słychać szczęk metalu... Kłódka otwarta! Udało się!`),
                    () => message("W środku szafki jest... tak! Kawałek karty magnetycznej! "),
                    () => giveItem("kawalek_karty_214"),
                    () => giveItem("sala214_szafka_otwarta"),
                    ...endMessages,
                    () => goToDialogPath("/sala/214"), // Powrót do głównej sali
                ],
                fail: [
                    () => message(`"${messageInput}"... Niestety, kłódka ani drgnie. To chyba nie ta data. Masz pewność że to dobra data? Może kartka z biblioteki coś podpowie?`),
                    () => goToDialogPath("/sala/214/biurko"), // Powrót do biurka, gdzie jest szafka
                ],
            }),
        ]
    },

    // === SALA 214 (/sala/214/goto) - NAWIGACJA ===
    {
        description: "Idz do...",
        isInput: false,
        path: "/sala/214",
        priority: 1, // Podstawowa opcja nawigacji
        actions: [
            () => goToDialogPath("/sala/214/goto"),
        ]
    },
    {
        description: "Jednak nie ważne.",
        isInput: false,
        path: "/sala/214/goto",
        priority: 1,
        actions: [
            () => message("Ok, zostaję tutaj."),
            () => goToDialogPath("/sala/214"),
        ]
    },
    {
        description: "biblioteki",
        isInput: false,
        path: "/sala/214/goto",
        priority: 1,
        actions: [
            () => message("Okej idę do biblioteki."),
            () => goToDialogPath("/biblioteka"),
        ]
    },
    {
        description: "101",
        isInput: false,
        path: "/sala/214/goto",
        priority: 1,
        actions: [
            () => message("Dobrze, idziemy do sali 101."),
            () => goToDialogPath("/sala/101"),
        ]
    },
    {
        description: "307",
        isInput: false,
        path: "/sala/214/goto",
        priority: 1,
        actions: [
            () => message("W porządku, kierunek sala 307."),
            () => goToDialogPath("/sala/307"),
        ]
    },
];

export default dialogsSala214;
