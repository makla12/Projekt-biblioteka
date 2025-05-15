import { message, goToDialogPath, giveItem, checkInventory, solvePuzzle } from "./dialogFunctions";

const firstMessages = [
    { message: "Halo...? Jest tu kto? Słyszycie mnie?", self: false },
    { message: "Jestem [imię postaci, np. Ania], utknęłam w szkolnej bibliotece! Wszystko pozamykane, a ja nie mogę otworzyć drzwi!", self: false },
    { message: "Na dworze już ciemno... Pomożesz mi się stąd wydostać?", self: false },
];

const dialogs = [
    // === POCZĄTEK GRY (Zaktualizowany /startDialog) ===
    // Zakładamy, że gracz widzi wstępne wiadomości od postaci,
    // a poniższe opcje pojawiają się jako pierwsze dla gracza w ścieżce "/startDialog".

    {
        description: "Tak, jasne! Co mam robić?", // Gracz zgadza się pomóc
        isInput: false,
        path: "/startDialog",
        actions: [
            // Reakcja postaci na zgodę
            () => message("Uff, wielkie dzięki! Nawet nie wiesz, jak mi ulżyło! Jestem teraz w głównej sali biblioteki. Wygląda inaczej niż zwykle w nocy..."),
            // Przejście do głównej lokacji gry
            () => goToDialogPath("/biblioteka"),
        ]
    },
    {
        description: "Jak to utknęłaś? Co się stało?", // Gracz dopytuje o szczegóły
        isInput: false,
        path: "/startDialog",
        ifNotHas: ["asked_how_trapped"], // Pokaż tę opcję tylko, jeśli gracz NIE MA flagi "asked_how_trapped"
        actions: [
            // Wyjaśnienie postaci
            () => message("Sama nie do końca rozumiem... Zaczytałam się w jednym z tych starych foteli w kącie. Kiedy się ocknęłam, było już dawno po dzwonku, a drzwi były zamknięte na jakiś dziwny, stary zamek, którego nigdy wcześniej nie widziałam. Proszę, pomóż mi!"),
            // Dodanie flagi do ekwipunku gracza
            () => giveItem("asked_how_trapped"),
            // Pozostanie w tym samym stanie, ale opcja "Jak to utknęłaś?" już się nie pojawi
            () => goToDialogPath("/startDialog"),
        ]
    },
    {
        description: "Przykro mi, nie mogę teraz.", // Gracz (próbuje) odmówić
        isInput: false,
        path: "/startDialog",
        actions: [
            // Błaganie postaci
            () => message("Co? Ale... proszę! Nie zostawiaj mnie tu samej! Obiecuję, że to nie potrwa długo! Na pewno razem coś wymyślimy! Zgadzasz się?"),
            // Pozostanie w tym samym stanie, dając graczowi szansę na zmianę zdania
            () => goToDialogPath("/startDialog"),
        ]
    },

    // === BIBLIOTEKA (/biblioteka) ===
    {
        description: "Rozejrzyj się dokładnie. Co widzisz?",
        isInput: false,
        path: "/biblioteka",
        actions: [
            () => message("Okej, rozglądam się... Widzę wysokie regały pełne książek, aż po sufit. Jest tu kilka stolików z lampkami, ale tylko jedna słabo świeci. Na środku stoi duże biurko bibliotekarza/bibliotekarki. No i te nieszczęsne drzwi wejściowe z tym dziwnym zamkiem."),
            () => goToDialogPath("/biblioteka"), // Pozostajemy w bibliotece
        ]
    },
    {
        description: "Spróbuj otworzyć drzwi.",
        isInput: false,
        path: "/biblioteka",
        ifNotHas: ["drzwi_otwarte"],
        actions: [
            // Można tu dodać logikę sprawdzania klucza, np.:
            
            () => checkInventory("klucz_do_biblioteki", [
                 // Jeśli NIE MA klucza:
                () => message("Już próbowałam chyba z tysiąc razy! Ani drgną. Ten zamek wygląda solidnie. Musi być jakiś inny sposób... Może jakiś kod? Albo klucz ukryty gdzieś tutaj?"),
                () => goToDialogPath("/biblioteka"),
            ]),
            // Jeśli MA klucz (kod wykona się, jeśli checkInventory nie przerwie):
            () => message("Chwila, mam ten mosiężny klucz! Spróbuję go użyć..."),
            () => message("Pasuje! Przekręcam... Drzwi otwarte! Możemy iść dalej!"),
            () => giveItem("drzwi_otwarte"), // Dodajemy flagę do ekwipunku gracza
            () => goToDialogPath("/biblioteka"), // Pozostajemy w bibliotece
        ]
    },
    {
        description: "Podejdź do biurka bibliotekarza.",
        isInput: false,
        path: "/biblioteka",
        actions: [
            () => message("Jestem przy biurku. Jest tu trochę papierów, stary monitor, lampka... Chwila! Coś tu leży przycupnięte za monitorem! Wygląda jak pognieciona kartka."),
            // Można dodać zdobycie przedmiotu lub przejście do podścieżki biurka
            // () => giveItem("pognieciona_kartka"),
            () => goToDialogPath("/biblioteka/biurko"), // Przejście do pod-ścieżki dla biurka
        ]
    },
    {
        description: "Poszukaj czegoś nietypowego na półkach.", // Rozpoczęcie ścieżki z pudełkiem
        isInput: false,
        ifNotHas: ["pudelko_znalezione"], // Pojawia się tylko jeśli gracz NIE MA flagi "pudelko_znalezione"
        path: "/biblioteka",
        actions: [
            () => message("Rozglądam się uważnie między regałami... Czekaj! Tutaj, na niższej półce za rzędem encyklopedii, stoi małe, drewniane pudełko. Wygląda na stare."),
            () => giveItem("pudelko_znalezione"), // Dodanie flagi do ekwipunku gracza
            () => goToDialogPath("/biblioteka"),
        ]
    },
    {
        description: "Idź do...", // Nawigacja
        isInput: false,
        path: "/biblioteka",
        ifHas: ["drzwi_otwarte"], 
        actions: [
            () => goToDialogPath("/biblioteka/goto"),
        ]
    },

    // === POD-ŚCIEŻKA BIURKA (/biblioteka/biurko) ===
    // (Przykładowa prosta interakcja na biurku)
    {
        description: "Przeczytaj pogniecioną kartkę.",
        isInput: false,
        path: "/biblioteka/biurko",
        actions: [
            // Tutaj można umieścić treść kartki - może to być kolejna wskazówka?
            () => message("Na kartce jest napisane tylko jedno słowo: 'Pamiętaj'. Dziwne."),
            () => goToDialogPath("/biblioteka/biurko"),
        ]
    },
    {
        description: "Wróć do głównej części biblioteki.",
        isInput: false,
        path: "/biblioteka/biurko",
        actions: [
            () => message("Okej, odchodzę od biurka."),
            () => goToDialogPath("/biblioteka"),
        ]
    },


    // === POD-ŚCIEŻKA Z PUDEŁKIEM ===
    // --- Stan: Pudełko znalezione (/biblioteka/pudelko_znalezione) ---
    {
        description: "Przyjrzyj się temu pudełku.",
        isInput: false,
        path: "/biblioteka",
        ifHas: ["pudelko_znalezione"], // Pojawia się tylko jeśli gracz ma flagę "pudelko_znalezione"
        ifNotHas: ["klucz_do_biblioteki"], // Pojawia się tylko jeśli gracz NIE MA flagi "klucz_do_biblioteki"
        actions: [
            () => message("Jest dość ciężkie, z ciemnego drewna. Nie ma dziurki na klucz, ale z przodu widzę mały zamek szyfrowy na cztery cyfry. Na wieczku jest coś wyryte."),
            () => goToDialogPath("/biblioteka/pudelko_opis"),
        ]
    },

    // --- Stan: Opis pudełka (/biblioteka/pudelko_opis) ---
    {
        description: "Co jest wyryte na wieczku?",
        isInput: false,
        path: "/biblioteka/pudelko_opis",
        actions: [
            () => message("Napis głosi: 'Sekret tkwi w głosach czytelników, tam gdzie lustro prawdę Ci powie. Szukaj opinii o ostatnich eksperymentach Frankensteina.' Hmm, brzmi jak zagadka."),
            () => goToDialogPath("/biblioteka/pudelko_opis"),
        ]
    },
    {
        description: "Ok chyba znam kod",
        isInput: false,
        path: "/biblioteka/pudelko_opis",
        actions: [
            () => message("Okej, słucham uważnie. Jaki kod mam wpisać?"),
            () => goToDialogPath("/biblioteka/wpisz_kod"),
        ]
    },
    {
        description: "Spróbuj otworzyć pudełko siłą.",
        isInput: false,
        path: "/biblioteka/pudelko_opis",
        actions: [
            () => message("Próbuję, ale jest solidne. Bez kodu ani rusz. Jeszcze je zniszczę."),
            () => goToDialogPath("/biblioteka/pudelko_opis"),
        ]
    },
    {
        description: "Wróć do rozglądania się po bibliotece.", // Opcja powrotu
        isInput: false,
        path: "/biblioteka/pudelko_opis",
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
        actions: [
            ({messageInput}) => solvePuzzle("1818", messageInput, { // Rozwiązanie "1818"
                success: [
                    () => message(`Wpisuję ${messageInput}... Słychać klik! Zamek puścił! Pudełko otwarte!`),
                    () => message("A w środku... jest mały, mosiężny klucz! Wygląda na ważny."),
                    () => giveItem("klucz_do_biblioteki"), // Dodanie klucza do ekwipunku gracza
                    () => message("Super! Mam klucz! Co teraz?"),
                    () => goToDialogPath("/biblioteka"),
                ],
                fail: [
                    () => message(`Wpisałem/am ${messageInput}... Niestety, nic się nie dzieje. Zamek nadal trzyma. To musi być zły kod. Sprawdź dokładnie wskazówkę i może poszukaj tych 'opinii' w internecie? Pamiętaj o 'lustrze'.`),
                    () => goToDialogPath("/biblioteka/pudelko_opis"),
                ],
            }),
        ]
    },
    // === POD-ŚCIEŻKA NAWIGACJI (/biblioteka/goto) ===
    {
        description: "Jednak nie ważne.", // Opcja anulowania nawigacji
        isInput: false,
        path: "/biblioteka/goto",
        actions: [
            () => message("Ok, zostaję tutaj."),
            () => goToDialogPath("/biblioteka"),
        ]
    },
    {
        description: "307",
        isInput: false,
        path: "/biblioteka/goto",
        actions: [
             // Akcje jeśli MA klucz (wykonają się, jeśli checkInventory nie przerwie)
            () => message("Okej, idę do sali 307."),
            () => goToDialogPath("/307"), // Zmiana lokacji na salę 307
        ]
    },
    {
        description: "101",
        isInput: false,
        path: "/biblioteka/goto",
        actions: [
            () => message("Idę do sali 101."),
            () => goToDialogPath("/101"),
        ]
    },
    {
        description: "214",
        isInput: false,
        path: "/biblioteka/goto",
        actions: [
            () => message("Idę w kierunku sali 214."),
            () => goToDialogPath("/214"),
        ]
    },

    //307
    {
        description:"Idz do",
        isInput:false,
        path:"/307",
        actions:[
            () => goToDialogPath("/307/goto"),
        ]
    },

    {
        description:"Jednak nie ważne",
        isInput:false,
        path:"/307/goto",
        actions:[
            () => message("Ok"),
            () => goToDialogPath("/307"),
        ]
    },

    {
        description:"biblioteka",
        isInput:false,
        path:"/307/goto",
        actions:[
            () => message("Ok już jestem"),
            () => goToDialogPath("/biblioteka"),
        ]
    },

    {
        description:"101",
        isInput:false,
        path:"/307/goto",
        actions:[
            () => message("Ok już jestem"),
            () => goToDialogPath("/101"),
        ]
    },

    {
        description:"214",
        isInput:false,
        path:"/307/goto",
        actions:[
            () => message("Ok już jestem"),
            () => goToDialogPath("/214"),
        ]
    },

    //101
    {
        description:"Idz do",
        isInput:false,
        path:"/101",
        actions:[
            () => goToDialogPath("/101/goto"),
        ]
    },

    {
        description:"Jednak nie ważne",
        isInput:false,
        path:"/101/goto",
        actions:[
            () => message("Ok"),
            () => goToDialogPath("/101"),
        ]
    },

    {
        description:"biblioteka",
        isInput:false,
        path:"/101/goto",
        actions:[
            () => message("Ok już jestem"),
            () => goToDialogPath("/biblioteka"),
        ]
    },

    {
        description:"307",
        isInput:false,
        path:"/101/goto",
        actions:[
            () => message("Ok już jestem"),
            () => goToDialogPath("/307"),
        ]
    },

    {
        description:"214",
        isInput:false,
        path:"/101/goto",
        actions:[
            () => message("Ok już jestem"),
            () => goToDialogPath("/214"),
        ]
    },

    //214
    {
        description:"Idz do",
        isInput:false,
        path:"/214",
        actions:[
            () => goToDialogPath("/214/goto"),
        ]
    },

    {
        description:"Jednak nie ważne",
        isInput:false,
        path:"/214/goto",
        actions:[
            () => message("Ok"),
            () => goToDialogPath("/214"),
        ]
    },

    {
        description:"biblioteka",
        isInput:false,
        path:"/214/goto",
        actions:[
            () => message("Ok już jestem"),
            () => goToDialogPath("/biblioteka"),
        ]
    },

    {
        description:"307",
        isInput:false,
        path:"/214/goto",
        actions:[
            () => message("Ok już jestem"),
            () => goToDialogPath("/307"),
        ]
    },

    {
        description:"101",
        isInput:false,
        path:"/214/goto",
        actions:[
            () => message("Ok już jestem"),
            () => goToDialogPath("/101"),
        ]
    },
]

export {dialogs, firstMessages};
