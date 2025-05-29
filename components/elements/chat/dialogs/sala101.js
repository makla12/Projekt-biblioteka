import { message, goToDialogPath, giveItem, checkInventory, solvePuzzle } from "./dialogFunctions";

const dialogsSala101 = [
    // === SALA 101 (/sala/101) - WEJŚCIE I PODSTAWOWA EKSPLORACJA ===
    {
        description: "Opisz mi jak wygląda sala 101.",
        isInput: false,
        path: "/sala/101",
        ifNotHas: ["sala101_opisana"],
        priority: 2,
        actions: [
            () => message("Jestem w sali 101. Wygląda na pracownię chemiczną. Pełno tu menzurek, probówek i różnych dziwnych przyrządów na stołach laboratoryjnych. Na jednym z nich stoi też stary laptop. Poza tym standardowo: ławki, tablica, biurko nauczyciela."),
            () => giveItem("sala101_opisana"),
            () => goToDialogPath("/sala/101"),
        ]
    },
    {
        description: "Rozejrzyj się dokładniej po stołach laboratoryjnych.",
        isInput: false,
        path: "/sala/101",
        ifHas: ["sala101_opisana"], // Dopiero po ogólnym opisie
        // USUNIĘTO ifNotHas: ["sala101_symbole_znalezione", "sala101_wskazowka_kalambury_znaleziona"]
        priority: 1,
        actions: [
            () => message("Przyglądam się stołom... Na jednym, trochę na uboczu, leżą jakieś pocięte karteczki z symbolami. A na innym, obok palnika Bunsena, widzę jakąś starą notatkę."),
            () => goToDialogPath("/sala/101/stoly_laboratoryjne"), // Podścieżka do wyboru, co zbadać
        ]
    },

    // === SALA 101 (/sala/101/stoly_laboratoryjne) - WYBÓR NA STOŁACH ===
    {
        description: "Sprawdź te pocięte karteczki z symbolami.", // Pierwsze znalezienie
        isInput: false,
        path: "/sala/101/stoly_laboratoryjne",
        ifNotHas: ["sala101_symbole_znalezione"],
        priority: 1,
        actions: [
            () => message("Podnoszę te karteczki. Są na nich symbole pierwiastków: Og, Ni, W, O. Wyglądają jak elementy jakiejś układanki."),
            () => giveItem("sala101_symbole_znalezione"),
            () => goToDialogPath("/sala/101/stoly_laboratoryjne"), // Pozostajemy, aby móc sprawdzić drugą rzecz lub wrócić
        ]
    },
    {
        description: "Przypomnij mi, co było na karteczkach z symbolami.", // Opcja przypomnienia
        isInput: false,
        path: "/sala/101/stoly_laboratoryjne",
        ifHas: ["sala101_symbole_znalezione"],
        priority: 2, // Niższy priorytet niż pierwsze znalezienie
        actions: [
            () => message("Jasne, na tych karteczkach były symbole pierwiastków: Og, Ni, W, O."),
            () => goToDialogPath("/sala/101/stoly_laboratoryjne"),
        ]
    },
    {
        description: "Przeczytaj tę starą notatkę.", // Pierwsze znalezienie
        isInput: false,
        path: "/sala/101/stoly_laboratoryjne",
        ifNotHas: ["sala101_wskazowka_kalambury_znaleziona"],
        priority: 1,
        actions: [
            () => message("Biorę tę notatkę. Jest trochę pożółkła. Ma nagłówek 'Chemiczne Kalambury' i są tu przykłady: symbole B, Al, O, N ułożone w słowo BALON, a potem K, O, Ti jako KOT. Ktoś tu chyba lubił takie łamigłówki... To musi być wskazówka, jak podejść do tych symboli, które widziałem wcześniej!"),
            () => giveItem("sala101_wskazowka_kalambury_znaleziona"),
            () => goToDialogPath("/sala/101/stoly_laboratoryjne"), // Pozostajemy
        ]
    },
    {
        description: "Co było napisane na tej notatce o 'Chemicznych Kalamburach'?", // Opcja przypomnienia
        isInput: false,
        path: "/sala/101/stoly_laboratoryjne",
        ifHas: ["sala101_wskazowka_kalambury_znaleziona"],
        priority: 2,
        actions: [
            () => message("Na tej notatce był nagłówek 'Chemiczne Kalambury' i przykłady: B, Al, O, N jako BALON oraz K, O, Ti jako KOT. To na pewno podpowiedź do ułożenia słowa z tych naszych symboli: Og, Ni, W, O."),
            () => goToDialogPath("/sala/101/stoly_laboratoryjne"),
        ]
    },
    {
        description: "Wróć do rozglądania się po sali.",
        isInput: false,
        path: "/sala/101/stoly_laboratoryjne",
        priority: 3, // Najniższy priorytet, jeśli inne opcje są dostępne
        actions: [
            () => message("Okej, odchodzę od tych stołów."),
            () => goToDialogPath("/sala/101"),
        ]
    },

    // === SALA 101 (/sala/101) - INTERAKCJA Z LAPTOPEM ===
    {
        description: "Podejdź do laptopa.",
        isInput: false,
        path: "/sala/101",
        ifHas: ["sala101_opisana"],
        // ifNotHas: ["sala101_laptop_odblokowany_os"],
        priority: 1,
        actions: [
            () => checkInventory("sala101_laptop_odblokowany_os", [
                () => message("Jestem przy laptopie."),
                () => goToDialogPath("/sala/101/laptop_pulpit"),
            ]),
            () => message("Jestem przy laptopie. Wygląda na dość stary model, ale jest włączony i wyświetla ekran logowania systemu. Prosi o hasło."),
            () => goToDialogPath("/sala/101/laptop_os_login"),
        ]
    },

    // --- Logowanie do systemu operacyjnego laptopa ---
    {
        description: "Wpisz hasło do systemu laptopa:",
        isInput: true,
        path: "/sala/101/laptop_os_login",
        priority: 1,
        actions: [
            ({messageInput}) => solvePuzzle("OGNIWO", messageInput.toUpperCase().trim(), {
                success: [
                    () => message(`Hasło "${messageInput.toUpperCase().trim()}" zadziałało! System się odblokował. Widzę standardowy pulpit, są tu ikony 'Dokumenty', 'Internet' i jedna aplikacja, która przykuwa uwagę, nazywa się 'Dziennik Badań Chemicznych'.`),
                    () => giveItem("sala101_laptop_odblokowany_os"),
                    () => goToDialogPath("/sala/101/laptop_pulpit"),
                ],
                fail: [
                    () => message(`Niestety, hasło "${messageInput.toUpperCase().trim()}" jest nieprawidłowe. System nadal zablokowany. Może te symbole pierwiastków (Og, Ni, W, O) i notatka o 'Chemicznych Kalamburach' coś podpowiedzą?`),
                    () => goToDialogPath("/sala/101"),
                ],
            }),
        ]
    },


    // --- Pulpit laptopa (po odblokowaniu systemu) ---
    {
        description: "Co jest na pulpicie laptopa?",
        isInput: false,
        path: "/sala/101/laptop_pulpit",
        priority: 2,
        actions: [
            () => message("Na pulpicie są ikony 'Dokumenty', 'Internet' i ta specjalna aplikacja 'Dziennik Badań Chemicznych'."),
            () => goToDialogPath("/sala/101/laptop_pulpit"),
        ]
    },
    {
        description: "Uruchom aplikację 'Dziennik Badań Chemicznych'.",
        isInput: false,
        path: "/sala/101/laptop_pulpit",
        ifNotHas: ["sala101_szuflada_otwarta"],
        priority: 1,
        actions: [
            () => message("Uruchamiam 'Dziennik Badań Chemicznych'... Oho, wygląda na to, że jest dodatkowo zabezpieczona hasłem. Jest pole do wpisania i przycisk 'OK', a pod spodem mały link 'Zapomniałem/am hasła'."),
            () => goToDialogPath("/sala/101/app_login"),
        ]
    },
    {
        description: "Odejdź od laptopa.",
        isInput: false,
        path: "/sala/101/laptop_pulpit",
        priority: 3,
        actions: [
            () => message("Okej, odchodzę od laptopa."),
            () => goToDialogPath("/sala/101"),
        ]
    },

    // --- Logowanie do aplikacji "Dziennik Badań Chemicznych" ---
    {
        description: "Wpisz hasło do aplikacji:",
        isInput: true,
        path: "/sala/101/app_login_input",
        priority: 1,
        actions: [
            ({messageInput}) => message(`Wpisałem/am "${messageInput.toUpperCase().trim()}"... Niestety, nieprawidłowe hasło do aplikacji. Może spróbuj opcji 'Zapomniałem hasła'?`),
            () => goToDialogPath("/sala/101/app_login"),
        ]
    },
    {
        description: "Kliknij 'Zapomniałem/am hasła'.",
        isInput: false,
        path: "/sala/101/app_login",
        priority: 1,
        actions: [
            () => message("Kliknąłem/nęłam 'Zapomniałem hasła'. Pojawiło się pytanie pomocnicze: 'Jak nazywa się pierwiastek, który brzmi podobnie do nazwiska znanego detektywa?'. Pod spodem jest pole do wpisania odpowiedzi."),
            () => message("No pięknie... Znowu coś, na czym kompletnie się nie znam. Książki i detektywi to nie moja bajka. Chyba będziesz musiał/a poszukać w bibliotece."),
            () => goToDialogPath("/sala/101/app_forgot_password"),
        ]
    },
    {
        description: "Wróć do pulpitu laptopa.",
        isInput: false,
        path: "/sala/101/app_login",
        priority: 2,
        actions: [
            () => goToDialogPath("/sala/101/laptop_pulpit"),
        ]
    },
    {
        description: "Wpisz hasło",
        isInput: false,
        path: "/sala/101/app_login",
        priority: 3,
        actions: [
            () => goToDialogPath("/sala/101/app_login_input"),
        ]
    },

    // --- Odzyskiwanie hasła do aplikacji (pytanie o detektywa) ---
    {
        description: "Wpisz odpowiedź na pytanie pomocnicze:",
        isInput: true,
        path: "/sala/101/app_forgot_password",
        priority: 1,
        actions: [
            ({messageInput}) => solvePuzzle("HOLM", messageInput.toUpperCase().trim().replace("IUM", ""), {
                success: [
                    () => message(`Wpisałem/am "${messageInput.toUpperCase().trim()}"... Chwila... System przyjął odpowiedź! Dostęp przyznany!`),
                    () => message("Aplikacja 'Dziennik Badań Chemicznych' się otworzyła. Na ekranie jest tylko jedna notatka: 'Klucz do sukcesu spoczywa tam, gdzie spoczywają stare eksperymenty - szuflada nr 1 pod stołem z laptopem. Kod dostępu: suma cyfr roku bitwy pod Grunwaldem.'"),
                    () => giveItem("sala101_app_odblokowana_info_o_szufladzie"),
                    () => message("Szybko sprawdzam szufladę nr 1 pod stołem... Jest! Otworzyła się po wpisaniu kodu (1410 -> 1+4+1+0=6)! A w środku... kolejny kawałek karty!"),
                    () => giveItem("kawalek_karty_101"),
                    () => giveItem("sala101_szuflada_otwarta"),
                    () => goToDialogPath("/sala/101"),
                ],
                fail: [
                    () => message(`Niestety, "${messageInput.toUpperCase().trim()}" to nie jest poprawna odpowiedź na pytanie pomocnicze. Musisz znaleźć w bibliotece książkę o słynnym detektywie i pomyśleć, który pierwiastek brzmi podobnie.`),
                    () => goToDialogPath("/sala/101/app_forgot_password"),
                ],
            }),
        ]
    },

    // === SALA 101 (/sala/101) - PO ROZWIĄZANIU ZAGADKI ===
    {
        description: "Co teraz? Zdobyliśmy kolejny kawałek karty.",
        isInput: false,
        path: "/sala/101",
        ifHas: ["sala101_szuflada_otwarta"],
        priority: 1,
        actions: [
            () => message("Świetna robota! Mamy już [X] kawałków karty. Gdzie idziemy szukać następnego? Została nam jeszcze sala 307, albo możemy wrócić do biblioteki, jeśli coś przeoczyliśmy."), // Placeholder [X] dla liczby kart
            () => goToDialogPath("/sala/101/goto"),
        ]
    },

    // === SALA 101 (/sala/101/goto) - NAWIGACJA ===
    {
        description: "Idz do...",
        isInput: false,
        path: "/sala/101",
        priority: 1,
        actions: [
            () => goToDialogPath("/sala/101/goto"),
        ]
    },
    {
        description: "Jednak nie ważne.",
        isInput: false,
        path: "/sala/101/goto",
        priority: 1,
        actions: [
            () => message("Ok, zostaję tutaj."),
            () => goToDialogPath("/sala/101"),
        ]
    },
    {
        description: "biblioteki",
        isInput: false,
        path: "/sala/101/goto",
        priority: 1,
        actions: [
            () => message("Okej idę do biblioteki."),
            () => goToDialogPath("/biblioteka"),
        ]
    },
    {
        description: "214",
        isInput: false,
        path: "/sala/101/goto",
        priority: 1,
        actions: [
            () => message("Dobrze, idziemy do sali 214."),
            () => goToDialogPath("/sala/214"),
        ]
    },
    {
        description: "307",
        isInput: false,
        path: "/sala/101/goto",
        priority: 1,
        actions: [
            () => message("W porządku, kierunek sala 307."),
            () => goToDialogPath("/sala/307"),
        ]
    },
];

export default dialogsSala101;
