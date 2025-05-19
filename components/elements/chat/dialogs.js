import { message, goToDialogPath, giveItem, checkInventory, solvePuzzle } from "./dialogFunctions";

const firstMessages = [
    { message: "Halo...? Jest tu kto? Słyszycie mnie?", self: false },
    { message: "Jestem [imię postaci, np. Ania], utknęłam w szkolnej bibliotece! Wszystko pozamykane, a ja nie mogę otworzyć drzwi!", self: false },
    { message: "Na dworze już ciemno... Pomożesz mi się stąd wydostać?", self: false },
];

const dialogs = [
    // === POCZĄTEK GRY (Zaktualizowany /startDialog) ===
    {
        description: "Tak, jasne! Co mam robić?", // Gracz zgadza się pomóc
        isInput: false,
        path: "/startDialog",
        priority: 1, 
        actions: [
            () => message("Uff, wielkie dzięki! Nawet nie wiesz, jak mi ulżyło! Jestem teraz w głównej sali biblioteki. Wygląda inaczej niż zwykle w nocy..."),
            () => goToDialogPath("/biblioteka"),
        ]
    },
    {
        description: "Jak to utknęłaś? Co się stało?", // Gracz dopytuje o szczegóły
        isInput: false,
        path: "/startDialog",
        ifNotHas: ["asked_how_trapped"],
        priority: 1,
        actions: [
            () => message("Sama nie do końca rozumiem... Zaczytałam się w jednym z tych starych foteli w kącie. Kiedy się ocknęłam, było już dawno po dzwonku, a drzwi były zamknięte na jakiś dziwny, stary zamek, którego nigdy wcześniej nie widziałam. Proszę, pomóż mi!"),
            () => giveItem("asked_how_trapped"),
            () => goToDialogPath("/startDialog"),
        ]
    },
    {
        description: "Przykro mi, nie mogę teraz.", // Gracz (próbuje) odmówić
        isInput: false,
        path: "/startDialog",
        priority: 1,
        actions: [
            () => message("Co? Ale... proszę! Nie zostawiaj mnie tu samej! Obiecuję, że to nie potrwa długo! Na pewno razem coś wymyślimy! Zgadzasz się?"),
            () => goToDialogPath("/startDialog"),
        ]
    },

    // === BIBLIOTEKA (/biblioteka) ===
    {
        description: "Rozejrzyj się dokładnie. Co widzisz?",
        isInput: false,
        path: "/biblioteka",
        ifNotHas: ["asked_to_look_around_library"],
        priority: 2,
        actions: [
            () => message("Okej, rozglądam się... Widzę wysokie regały pełne książek, aż po sufit. Jest tu kilka stolików z lampkami, ale tylko jedna słabo świeci. Na środku stoi duże biurko bibliotekarza/bibliotekarki. No i te nieszczęsne drzwi wejściowe z tym dziwnym zamkiem."),
            () => giveItem("asked_to_look_around_library"),
            () => goToDialogPath("/biblioteka"),
        ]
    },
    {
        description: "Spróbuj otworzyć drzwi.",
        isInput: false,
        path: "/biblioteka",
        ifNotHas: ["drzwi_otwarte"],
        priority: 1,
        actions: [
            () => checkInventory("klucz_do_biblioteki", [
                () => message("Już próbowałam chyba z tysiąc razy! Ani drgną. Ten zamek wygląda solidnie. Musi być jakiś inny sposób... Może jakiś kod? Albo klucz ukryty gdzieś tutaj?"),
                () => goToDialogPath("/biblioteka"),
            ]),
            () => message("Mam ten klucz! Spróbuję go użyć..."),
            () => message("Pasuje! Przekręcam... Drzwi otwarte! Możemy iść dalej!"),
            () => giveItem("drzwi_otwarte"),
            () => goToDialogPath("/biblioteka"),
        ]
    },
    {
        description: "Podejdź do biurka bibliotekarza.",
        isInput: false,
        path: "/biblioteka",
        ifHas: ["asked_to_look_around_library"],
        priority: 2,
        actions: [
            () => message("Jestem przy biurku. Jest tu trochę papierów, stary monitor, lampka."),
            () => message("Coś tu leży przycupnięte za monitorem! Wygląda jak pognieciona kartka."),
            () => goToDialogPath("/biblioteka/biurko"),
        ]
    },
    {
        description: "Poszukaj czegoś nietypowego na półkach.",
        isInput: false,
        ifHas: ["asked_to_look_around_library"],
        ifNotHas: ["pudelko_znalezione"],
        path: "/biblioteka",
        priority: 2,
        actions: [
            () => message("Rozglądam się uważnie między regałami... Czekaj! Tutaj, na niższej półce za rzędem encyklopedii, stoi małe, drewniane pudełko. Wygląda na stare."),
            () => giveItem("pudelko_znalezione"),
            () => goToDialogPath("/biblioteka"),
        ]
    },

    // === POD-ŚCIEŻKA BIURKA (/biblioteka/biurko) ===
    {
        description: "Przeczytaj pogniecioną kartkę.",
        isInput: false,
        path: "/biblioteka/biurko",
        priority: 1,
        actions: [
            () => message("Na kartce jest napisane ELEKTRYK-1965 a pod tym pamiętaj o dacie od której wszystko się zaczeło. Nie wiem co to znaczy, ale może to coś ważnego?"),
            () => giveItem("elektryk_1965_sheet_read"),
            () => goToDialogPath("/biblioteka/biurko"),
        ]
    },
    {
        description: "Wróć do głównej części biblioteki.",
        isInput: false,
        path: "/biblioteka/biurko",
        priority: 1,
        actions: [
            () => message("Okej, odchodzę od biurka."),
            () => goToDialogPath("/biblioteka"),
        ]
    },

    // === POD-ŚCIEŻKA Z PUDEŁKIEM ===
    {
        description: "Przyjrzyj się temu pudełku.",
        isInput: false,
        path: "/biblioteka",
        ifHas: ["pudelko_znalezione"],
        ifNotHas: ["klucz_do_biblioteki"],
        priority: 3,
        actions: [
            () => message("Jest dość ciężkie, z ciemnego drewna. Nie ma dziurki na klucz, ale z przodu widzę mały zamek szyfrowy na cztery cyfry. Na wieczku jest coś wyryte."),
            () => goToDialogPath("/biblioteka/pudelko_opis"),
        ]
    },
    {
        description: "Co jest wyryte na wieczku?",
        isInput: false,
        path: "/biblioteka/pudelko_opis",
        priority: 2,
        actions: [
            () => message("Napis głosi: 'Sekret tkwi w głosach czytelników, tam gdzie lustro prawdę Ci powie. Szukaj opinii o ostatnich eksperymentach Frankensteina.' Hmm, brzmi jak zagadka."),
            () => goToDialogPath("/biblioteka/pudelko_opis"),
        ]
    },
    {
        description: "Ok chyba znam kod",
        isInput: false,
        path: "/biblioteka/pudelko_opis",
        priority: 3,
        actions: [
            () => message("Okej, słucham uważnie. Jaki kod mam wpisać?"),
            () => goToDialogPath("/biblioteka/wpisz_kod"),
        ]
    },
    {
        description: "Spróbuj otworzyć pudełko siłą.",
        isInput: false,
        path: "/biblioteka/pudelko_opis",
        priority: 1,
        actions: [
            () => message("Próbuję, ale jest solidne. Bez kodu ani rusz. Jeszcze je zniszczę."),
            () => goToDialogPath("/biblioteka/pudelko_opis"),
        ]
    },
    {
        description: "Wróć do rozglądania się po bibliotece.",
        isInput: false,
        path: "/biblioteka/pudelko_opis",
        priority: 1,
        actions: [
            () => message("Dobra, wracam do rozglądania się."),
            () => goToDialogPath("/biblioteka"),
        ]
    },

    // --- Stan: Wpisywanie kodu (/biblioteka/wpisz_kod) ---
    {
        description: "Wpisz kod:",
        isInput: true,
        path: "/biblioteka/wpisz_kod",
        priority: 1,
        actions: [
            ({messageInput}) => solvePuzzle("1818", messageInput, {
                success: [
                    () => message(`Wpisuję ${messageInput}... Słychać klik! Zamek puścił! Pudełko otwarte!`),
                    () => message("A w środku... jest mały, klucz! Wygląda na ważny."),
                    () => giveItem("klucz_do_biblioteki"),
                    () => message("Super! Mam klucz! Co teraz?"),
                    () => goToDialogPath("/biblioteka"),
                ],
                fail: [
                    () => message(`Wpisałem/am ${messageInput}. Niestety, nic się nie dzieje. Może ten napis na wieczku coś nam podpowie?`),
                    () => goToDialogPath("/biblioteka/pudelko_opis"),
                ],
            }),
        ]
    },

    // === POD-ŚCIEŻKA NAWIGACJI (/biblioteka/goto) ===
    {
        description: "Idź do...",
        isInput: false,
        path: "/biblioteka",
        ifHas: ["drzwi_otwarte"],
        priority: 1,
        actions: [
            () => goToDialogPath("/biblioteka/goto"),
        ]
    },
    {
        description: "Jednak nie ważne.",
        isInput: false,
        path: "/biblioteka/goto",
        priority: 1,
        actions: [
            () => message("Ok, zostaję tutaj."),
            () => goToDialogPath("/biblioteka"),
        ]
    },
    {
        description: "307",
        isInput: false,
        path: "/biblioteka/goto",
        priority: 1,
        actions: [
            () => message("Okej, idę do sali 307."),
            () => message("Już jestem! Co dalej?"),
            () => goToDialogPath("/307")
        ]
    },
    {
        description: "101",
        isInput: false,
        path: "/biblioteka/goto",
        priority: 1,
        actions: [
            () => message("Idę do sali 101."),
            () => message("Już jestem! Co dalej?"),
            () => goToDialogPath("/101"),
        ]
    },
    {
        description: "214",
        isInput: false,
        path: "/biblioteka/goto",
        priority: 1,
        actions: [
            () => message("Idę w kierunku sali 214."),
            () => message("Już jestem! Co dalej?"),
            () => goToDialogPath("/sala/214"),
        ]
    },

    // === SALA 214 (/sala/214) - WEJŚCIE I PODSTAWOWA EKSPLORACJA ===
    {
        description: "Opisz mi jak wygląda sala.",
        isInput: false,
        path: "/sala/214",
        ifNotHas: ["asked_to_look_around_214"],
        priority: 2,
        actions: [
            () => message("Widzę dużo ławek ustawionych w rzędach, tradycyjnie. Na ścianie wiszą dwa obrazy: jeden wygląda jak jakiś pałac rzymski, a drugi to portret Juliusza Cezara. Jest też biurko nauczycielskie, a w nim jedna szafka jest zamknięta na kłódkę."),
            () => giveItem("sala214_opisana"),
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
            () => message("Ten ze schematem jest dość skomplikowany, dużo symboli, których nie rozpoznaję. Podpisany 'Wzmacniacz klasy A'. Drugi to znany portret Skłodowskiej-Curie z podpisem 'Wielka Polka, Wielka Uczona'. Żaden nie wygląda, jakby krył wskazówkę do kłódki."),
            () => goToDialogPath("/sala/214"),
        ]
    },
    {
        description: "Sprawdź biurko nauczycielskie.",
        isInput: false,
        path: "/sala/214",
        ifHas: ["asked_to_look_around_214"],
        priority: 2,
        actions: [
            () => message("Na blacie leży kilka starych dzienników i parę długopisów. Szuflady są pootwierane i puste. Nic ciekawego, poza tą jedną zamkniętą szafką."),
            () => goToDialogPath("/sala/214"),
        ]
    },
    {
        description: "Poszukaj czegoś nietypowego na ławkach.",
        isInput: false,
        path: "/sala/214",
        priority: 2,
        ifNotHas: ["sala214_szyfr_znaleziony"],
        actions: [
            () => message("Chwila... Tak! Na jednej z ławek w ostatnim rzędzie leży kartka. Jest na niej wydrukowana jakaś tabela i odręcznie napisany ciąg liter: MDND MHWX GDXD SRZWXDQLD WCNROB?. To na pewno jakiś szyfr!"),
            () => giveItem("sala214_szyfr_znaleziony"),
            () => goToDialogPath("/sala/214"),
        ]
    },

    // === SALA 214 (/sala/214) - INTERAKCJA Z SZYFREM (po jego znalezieniu) ===
    {
        description: "Przeczytaj mi ten szyfr z kartki jeszcze raz.",
        isInput: false,
        path: "/sala/214",
        priority: 1,
        ifHas: ["sala214_szyfr_znaleziony"],
        ifNotHas: ["sala214_pytanie_rozszyfrowane"],
        actions: [
            () => message("Jasne. Zaszyfrowana wiadomość to: MDND MHWX GDXD SRZWXDQLD WCNROB?. Obok jest ta tabela. Może klucz do tego typu szyfru był w tej książce o kryptografii, którą widziałem/am w bibliotece?"),
            () => goToDialogPath("/sala/214"),
        ]
    },
    {
        description: "Myślę, że rozszyfrowałem/am wiadomość. Chcę ją podać.",
        isInput: false,
        path: "/sala/214",
        priority: 1,
        ifHas: ["sala214_szyfr_znaleziony"],
        ifNotHas: ["sala214_pytanie_rozszyfrowane"],
        actions: [
            () => message("Świetnie! Jestem bardzo ciekawy/ciekawa. Jak brzmi rozszyfrowana wiadomość?"),
            () => goToDialogPath("/sala/214/podaj_rozszyfrowana_wiadomosc"),
        ]
    },

    // === SALA 214 (/sala/214/podaj_rozszyfrowana_wiadomosc) - GRACZ WPISUJE ROZSZYFROWANE PYTANIE ===
    {
        description: "Wpisz rozszyfrowaną wiadomość:",
        isInput: true,
        path: "/sala/214/podaj_rozszyfrowana_wiadomosc",
        priority: 1,
        actions: [
            ({messageInput}) => solvePuzzle("JAKA JEST DATA POWSTANIA SZKOLY", messageInput.toUpperCase().replace("?", ""), {
                success: [
                    () => message("Niesamowite! 'JAKA JEST DATA POWSTANIA SZKOŁY?' To musi być to! Teraz tylko trzeba znaleźć tę datę..."),
                    () => giveItem("sala214_pytanie_rozszyfrowane"),
                    () => goToDialogPath("/sala/214"),
                ],
                fail: [
                    () => message(`Hmm, "${messageInput}"... Coś mi tu nie pasuje. Sprawdź jeszcze raz szyfr, tabelę i ewentualne wskazówki z książki o kryptografii. Może drobny błąd?`),
                    () => goToDialogPath("/sala/214/podaj_rozszyfrowana_wiadomosc"),
                ],
            }),
        ]
    },
    {
        description: "Wróć (zostaw szyfr na razie).",
        isInput: false,
        path: "/sala/214/podaj_rozszyfrowana_wiadomosc",
        priority: 1,
        actions: [
            () => goToDialogPath("/sala/214"),
        ]
    },

    // === SALA 214 (/sala/214) - PO ROZSZYFROWANIU PYTANIA ===
    {
        description: "Znam odpowiedź na pytanie o datę powstania szkoły.",
        isInput: false,
        path: "/sala/214",
        priority: 1,
        ifHas: ["sala214_pytanie_rozszyfrowane"],
        ifNotHas: ["sala214_szafka_otwarta"],
        actions: [
            () => message("Naprawdę? Super! Jaka to data? Mam nadzieję, że to będzie kod do kłódki."),
            () => goToDialogPath("/sala/214/podaj_date_szkoly"),
        ]
    },
    {
        description: "Gdzie mogliśmy widzieć datę powstania szkoły? (Przypomnij)",
        isInput: false,
        path: "/sala/214",
        priority: 1,
        ifHas: ["sala214_pytanie_rozszyfrowane"],
        ifNotHas: ["sala214_szafka_otwarta"],
        actions: [
            () => message("Data powstania szkoły... Coś mi świta... Wydaje mi się, że w bibliotece, na tej dużej tablicy pamiątkowej przy wejściu, był wielki napis 'ELEKTRYK' i jakaś data... Tak, chyba 'ELEKTRYK - 1965'! To musi być to!"),
            () => goToDialogPath("/sala/214"),
        ]
    },

    // === SALA 214 (/sala/214/podaj_date_szkoly) - GRACZ WPISUJE DATĘ (KOD DO KŁÓDKI) ===
    {
        description: "Wpisz datę (rok):",
        isInput: true,
        path: "/sala/214/podaj_date_szkoly",
        priority: 1,
        actions: [
            ({messageInput}) => solvePuzzle("1965", messageInput, {
                success: [
                    () => message(`Wpisuję ${messageInput}... Słychać szczęk metalu... Kłódka otwarta! Udało się!`),
                    () => message("W środku szafki jest... tak! Kolejny kawałek jakiejś karty! Jest na nim fragment jakiegoś symbolu lub mapy."),
                    () => giveItem("kawalek_karty_214"),
                    () => giveItem("sala214_szafka_otwarta"),
                    () => goToDialogPath("/sala/214"),
                ],
                fail: [
                    () => message(`"${messageInput}"... Niestety, kłódka ani drgnie. To chyba nie ta data. Jesteś pewien/pewna, że to rok powstania szkoły? Może warto jeszcze raz sprawdzić w bibliotece ten napis 'ELEKTRYK - 1965'?`),
                    () => goToDialogPath("/sala/214/podaj_date_szkoly"),
                ],
            }),
        ]
    },
    {
        description: "Wróć (zostaw kłódkę na razie).",
        isInput: false,
        path: "/sala/214/podaj_date_szkoly",
        priority: 1,
        actions: [
            () => goToDialogPath("/sala/214"),
        ]
    },

    // === SALA 214 (/sala/214/goto) - NAWIGACJA ===
    {
        description: "Idz do...",
        isInput: false,
        path: "/sala/214",
        priority: 1,
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
        description: "sali 101",
        isInput: false,
        path: "/sala/214/goto",
        priority: 1,
        actions: [
            () => message("Dobrze, idziemy do sali 101."),
            () => goToDialogPath("/101"),
        ]
    },
    {
        description: "sali 307",
        isInput: false,
        path: "/sala/214/goto",
        priority: 1,
        actions: [
            () => message("W porządku, kierunek sala 307."),
            () => goToDialogPath("/307"),
        ]
    },
]

export {dialogs, firstMessages}