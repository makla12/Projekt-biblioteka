import { message, goToDialogPath, giveItem, checkInventory, solvePuzzle } from "./dialogFunctions";

const dialogsBiblioteka = [
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
            () => checkInventory(["klucz_do_biblioteki"], [
                () => message("Mam ten klucz! Spróbuję go użyć..."),
                () => message("Pasuje! Przekręcam... Drzwi otwarte! Możemy iść dalej!"),
                () => giveItem("drzwi_otwarte"),
                () => message("Niestety główne drzwi od szkoły są zamknięte a ja zapomniałem dzisiaj karty magnetycznej do otworzenia ich może znajdziemy jakąś w szkole"),
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

    // === POD-ŚCIEŻKA Z PUDEŁKIEM (/biblioteka -> /biblioteka/pudelko_opis -> /biblioteka/wpisz_kod) ===
    {
        description: "Przyjrzyj się temu pudełku.",
        isInput: false,
        path: "/biblioteka", // Ta opcja pojawia się w głównej bibliotece
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
    {
        description: "Wpisz kod:", // Do pudełka
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

    // === POD-ŚCIEŻKA NAWIGACJI Z BIBLIOTEKI (/biblioteka/goto) ===
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
            () => goToDialogPath("/sala/307")
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
            () => goToDialogPath("/sala/101"),
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
];

export default dialogsBiblioteka;
