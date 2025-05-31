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
        description: "Rozejrzyj się po stołach laboratoryjnych.",
        isInput: false,
        path: "/sala/101",
        ifHas: ["sala101_opisana"], // Dopiero po ogólnym opisie
        priority: 2,
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
            () => message("Podnoszę te karteczki. Są na nich symbole pierwiastków: Ni, O, W, Og. Wyglądają jak elementy jakiejś układanki."),
            () => giveItem("sala101_symbole_znalezione"),
            () => goToDialogPath("/sala/101/stoly_laboratoryjne"), // Pozostajemy, aby móc sprawdzić drugą rzecz lub wrócić
        ]
    },
    {
        description: "Co było na tych pociętych karteczkach?", // Opcja przypomnienia
        isInput: false,
        path: "/sala/101/stoly_laboratoryjne",
        ifHas: ["sala101_symbole_znalezione"],
        priority: 2, 
        actions: [
            () => message("Na karteczkach były symbole pierwiastków: Ni, O, W, Og."),
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
            () => message("Biorę tę notatkę. Jest trochę pożółkła. Ma nagłówek 'Chemiczne Kalambury' i jest tu przykład: symbole O, N, Al, B ułożone w słowo BALON. Ktoś tu chyba lubił takie łamigłówki."),
            () => giveItem("sala101_wskazowka_kalambury_znaleziona"),
            () => goToDialogPath("/sala/101/stoly_laboratoryjne"), // Pozostajemy
        ]
    },
    {
        description: "Co było napisane na tej notatce?", // Opcja przypomnienia
        isInput: false,
        path: "/sala/101/stoly_laboratoryjne",
        ifHas: ["sala101_wskazowka_kalambury_znaleziona"],
        priority: 2,
        actions: [
            () => message("Na tej notatce był nagłówek 'Chemiczne Kalambury' i przykład: O, N, Al, B jako BALON."),
            () => goToDialogPath("/sala/101/stoly_laboratoryjne"),
        ]
    },
    {
        description: "Wróć do rozglądania się po sali.",
        isInput: false,
        path: "/sala/101/stoly_laboratoryjne",
        priority: 1, 
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
        ifNotHas: ["kawalek_karty_101"], 
        priority: 3,
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
                    () => message(`Niestety, hasło "${messageInput.toUpperCase().trim()}" jest nieprawidłowe. System nadal zablokowany.`),
                    () => goToDialogPath("/sala/101"),
                ],
            }),
        ]
    },


    // --- Pulpit laptopa (po odblokowaniu systemu) ---
    {
        description: "Sprawdź ikonę dokumenty.",
        isInput: false,
        path: "/sala/101/laptop_pulpit",
        ifNotHas: ["sala101_laptop_dokumenty_sprawdzone"],
        priority: 2,
        actions: [
            () => message("Nic ciekawego. Jedynie jakieś stare pliki z notatkami chemicznymi. I testy uczniów z czasów pandemi."),
            () => giveItem("sala101_laptop_dokumenty_sprawdzone"),
            () => goToDialogPath("/sala/101/laptop_pulpit"),
        ]
    },
    {
        description: "Sprawdź ikonę internet.",
        isInput: false,
        path: "/sala/101/laptop_pulpit",
        ifNotHas: ["sala101_laptop_internet_sprawdzony"],
        priority: 2,
        actions: [
            () => message("Jest to zwykła przeglądarka internetowa. Nic co nam się może przydać."),
            () => giveItem("sala101_laptop_internet_sprawdzony"),
            () => goToDialogPath("/sala/101/laptop_pulpit"),
        ]
    },
    {
        description: "Uruchom tą specjalną aplikację.",
        isInput: false,
        path: "/sala/101/laptop_pulpit",
        ifNotHas: ["sala101_szuflada_otwarta"],
        priority: 3,
        actions: [
            () => message("Uruchamiam 'Dziennik Badań Chemicznych'... Oho, wygląda na to, że jest dodatkowo zabezpieczona hasłem. Jest pole do wpisania i przycisk 'OK', a pod spodem mały link 'Zapomniałem/am hasła'."),
            () => goToDialogPath("/sala/101/app_login"),
        ]
    },
    {
        description: "Odejdź od laptopa.",
        isInput: false,
        path: "/sala/101/laptop_pulpit",
        priority: 1,
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
            ({messageInput}) => message(`Wpisałem/am "${messageInput.toUpperCase().trim()}"... Niestety, nieprawidłowe hasło do aplikacji.`),
            () => goToDialogPath("/sala/101/app_login"),
        ]
    },
    {
        description: "Kliknij 'Zapomniałem/am hasła'.",
        isInput: false,
        path: "/sala/101/app_login",
        priority: 2,
        actions: [
            () => message("Kliknąłem 'Zapomniałem hasła'. Pojawiło się pytanie pomocnicze: 'Jak nazywa się pierwiastek, który brzmi podobnie do nazwiska znanego detektywa?'. Pod spodem jest pole do wpisania odpowiedzi."),
            () => goToDialogPath("/sala/101/app_forgot_password"),
        ]
    },
    {
        description: "Wróć do pulpitu laptopa.",
        isInput: false,
        path: "/sala/101/app_login",
        priority: 1,
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
        description: "Wpisz",
        isInput: false,
        path: "/sala/101/app_forgot_password",
        priority: 3,
        actions: [
            () => goToDialogPath("/sala/101/app_forgot_password_input"),
        ]
    },
    {
        description: "Wróć do ekranu logowania.",
        isInput: false,
        path: "/sala/101/app_forgot_password",
        priority: 1,
        actions: [
            () => message("Okej, wracam do ekranu logowania."),
            () => goToDialogPath("/sala/101/app_login"),
        ]
    },
    {
        description: "Wpisz odpowiedź na pytanie pomocnicze:",
        isInput: true,
        path: "/sala/101/app_forgot_password_input",
        priority: 1,
        actions: [
            ({messageInput}) => solvePuzzle("HOLM", messageInput.toUpperCase().trim().replace("IUM", ""), {
                success: [
                    () => message(`Wpisałem/am "${messageInput.toUpperCase().trim()}"... Chwila... System przyjął odpowiedź! Dostęp przyznany!`),
                    () => message("Aplikacja 'Dziennik Badań Chemicznych' się otworzyła. Na ekranie jest przycisk 'Otwórz szufladę nr 1'. Klikam go..."),
                    () => message("Szybko sprawdzam szufladę nr 1 pod stołem... Jest! Otworzyła się. A w środku... kolejny kawałek karty!"),
                    () => giveItem("kawalek_karty_101"),
                    () => giveItem("sala101_szuflada_otwarta"),
                    () => goToDialogPath("/sala/101"),
                ],
                fail: [
                    () => message(`Niestety, "${messageInput.toUpperCase().trim()}" to nie jest poprawna odpowiedź na pytanie pomocnicze.`),
                    () => goToDialogPath("/sala/101/app_forgot_password"),
                ],
            }),
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
