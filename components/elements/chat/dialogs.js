import { message, goToDialogPath, giveItem, checkInventory, solvePuzzle } from "./dialogFunctions";

const firstMessages = [
    { message: "Halo...? Jest tu kto? Słyszycie mnie?", self: false },
    { message: "Jestem Amper, utknęłem w szkolnej bibliotece! Wszystko pozamykane, a ja nie mogę otworzyć drzwi!", self: false },
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
        description: "Jak to utknąłem? Co się stało?", // Gracz dopytuje o szczegóły
        isInput: false,
        path: "/startDialog",
        ifNotHas: ["asked_how_trapped"],
        priority: 1,
        actions: [
            () => message("Sam nie do końca rozumiem... Zaczytałem się w jednym z tych starych foteli w kącie. Kiedy się ocknęłem, było już dawno po dzwonku, a drzwi były zamknięte na jakiś dziwny, stary zamek, którego nigdy wcześniej nie widziałam. Proszę, pomóż mi!"),
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
            () => message("Co? Ale... proszę! Nie zostawiaj mnie tu! Obiecuję, że to nie potrwa długo! Na pewno razem coś wymyślimy! Zgadzasz się?"),
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
                () => message("Mam ten klucz! Spróbuję go użyć..."),
                () => message("Pasuje! Przekręcam... Drzwi otwarte! Możemy iść dalej!"),
                () => giveItem("drzwi_otwarte"),
                () => goToDialogPath("/biblioteka"),
            ]),
            () => message("Już próbowałem chyba z tysiąc razy! Ani drgną. Ten zamek wygląda solidnie. Musi być jakiś inny sposób... Może jakiś kod? Albo klucz ukryty gdzieś tutaj?"),
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
            () => checkInventory("sala214_pytanie_rozszyfrowane", [
                () => message("Raczej to już się nam nie przyda."),
                () => goToDialogPath("/sala/214"),
            ]),
            () => goToDialogPath("/sala/214"),
        ]
    },
    {
        description: "Podejdz do biurka nauczycielskiego.",
        isInput: false,
        path: "/sala/214",
        ifNotHas: ["sala214_biurko_przeszukane"],
        ifHas: ["asked_to_look_around_214"],
        priority: 2,
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

    // === SALA 214 (/sala/214) - INTERAKCJA PRZY BIURKU ===
    {
        description: "",
        isInput: false,
        path: "/sala/214/biurko",
        priority: 1,
        actions: [
            () => message(""),
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
        priority: 3,
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
            () => message("Jasne. Napis to: MDND MHVW GDWD SRZVWDQLD VCNROB?. Może w bibliotece jest jakaś książka która może nam pomóc?"),
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
            ({messageInput}) => solvePuzzle("JAKA JEST DATA POWSTANIA SZKOLY", messageInput.toUpperCase().replace("?", ""), {
                success: [
                    () => message("Niesamowite! 'JAKA JEST DATA POWSTANIA SZKOŁY?' To musi być kodem do tej szawki! Teraz tylko trzeba znaleźć tę datę..."),
                    () => giveItem("sala214_pytanie_rozszyfrowane"),
                    () => checkInventory("sheet_elektryk_1965_sheet_read", [
                        () => message("Hmm, wydaje mi się, że coś odnośnie tego widziałem w bibliotece."),
                        () => goToDialogPath("/sala/214"),
                    ]),
                    () => goToDialogPath("/sala/214"),
                ],
                fail: [
                    () => message(`Hmm, "${messageInput}"... Coś mi tu nie pasuje. Sprawdź jeszcze raz szyfr, tabelę i ewentualne wskazówki z książki o kryptografii. Może drobny błąd?`),
                    () => goToDialogPath("/sala/214"),
                ],
            }),
        ]
    },

    // === SALA 214 (/sala/214) - PO ROZSZYFROWANIU PYTANIA ===
    {
        description: "Chyba znam tą datę.",
        isInput: false,
        path: "/sala/214",
        ifHas: ["sala214_pytanie_rozszyfrowane"],
        ifNotHas: ["sala214_szafka_otwarta"],
        priority: 3,
        actions: [
            () => message("Naprawdę? Super! Jaka to data? Mam nadzieję, że to będzie kod do kłódki."),
            () => goToDialogPath("/sala/214/podaj_date_szkoly"),
        ]
    },
    {
        description: "Gdzie może być ta data?",
        isInput: false,
        path: "/sala/214",
        priority: 3,
        ifHas: ["sala214_pytanie_rozszyfrowane"],
        ifNotHas: ["sala214_szafka_otwarta"],
        actions: [
            () => checkInventory("elektryk_1965_sheet_read", [
                () => message("Wydaje mi się, że coś odnośnie tego widziałem w bibliotece."),
                () => goToDialogPath("/sala/214"),
            ]),
            () => message("Nie wiem, może poszukamy czegoś w innych salach?"),
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
                    () => message(`"${messageInput}"... Niestety, kłódka ani drgnie. To chyba nie ta data. Masz pewność że to dobra data?`),
                    () => goToDialogPath("/sala/214"),
                ],
            }),
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
        description: "101",
        isInput: false,
        path: "/sala/214/goto",
        priority: 1,
        actions: [
            () => message("Dobrze, idziemy do sali 101."),
            () => goToDialogPath("/101"),
        ]
    },
    {
        description: "307",
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