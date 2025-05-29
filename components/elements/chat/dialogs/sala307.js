import { message, goToDialogPath, giveItem, checkInventory, solvePuzzle } from "./dialogFunctions";

const dialogsSala307 = [

    // === SALA 307 (/sala/307) - WEJŚCIE I PODSTAWOWA EKSPLORACJA ===
    {
        description: "Opisz mi jak wygląda sala 307.",
        isInput: false,
        path: "/sala/307",
        ifNotHas: ["sala307_opisana"],
        priority: 2,
        actions: [
            () => message("Jestem w sali 307. Wygląda na pracownię programowania. Jest tu kilka rzędów stanowisk komputerowych które są ponumerowane od 1 do 20, ale wszystkie monitory są wyłączone. Na ścianach wiszą plakaty ze składnią różnych języków programowania. Na jednym z biurek pośrodku leży jakaś kartka."),
            () => giveItem("sala307_opisana"),
            () => goToDialogPath("/sala/307"),
        ]
    },
    {
        description: "Podejdź do kartki na biurku.",
        isInput: false,
        path: "/sala/307",
        ifHas: ["sala307_opisana"],
        ifNotHas: ["sala307_kod_binarny_odczytany"],
        priority: 1,
        actions: [
            () => message("Podchodzę do biurka. Na kartce jest napisane: \"10010 niech ta liczba cię poprowadzi\" ciekawe o co może chodzić"), 
            () => giveItem("sala307_kod_binarny_odczytany"), 
            () => goToDialogPath("/sala/307"),
        ]
    },
    {
        description: "Co było napisane na tej kartce? ",
        isInput: false,
        path: "/sala/307",
        ifHas: ["sala307_kod_binarny_odczytany"],
        priority: 1, 
        actions: [
            () => message("Na kartce było napisane: \"10010 niech ta liczba cię poprowadzi\""),
            () => goToDialogPath("/sala/307"),
        ]
    },
    {
        description: "Podejdź do komputera",
        isInput: false,
        path: "/sala/307",
        priority: 3,
        actions: [
            () => checkInventory("sala307_komputer_uruchomiony", [
                () => message("Okej podchodzę do tego działającego komputera"),
                () => goToDialogPath("/sala/307/komputer_z_hasla")
            ]),
            () => message("Okej ale do którego"), 
            () => goToDialogPath("/sala/307/podaj_numer_komputera"),
        ]
    },

    // === SALA 307 (/sala/307/podaj_numer_komputera) - GRACZ WPISUJE NUMER KOMPUTERA ===
    {
        description: "Wpisz numer stanowiska:",
        isInput: true,
        path: "/sala/307/podaj_numer_komputera",
        priority: 1,
        actions: [
            ({messageInput}) => solvePuzzle("3", messageInput.trim().toLowerCase(), {
                success: [
                    () => message(`OK, podchodzę do komputera oznaczonego numerem ${messageInput.trim()}. Spróbuję go włączyć...`),
                    () => message("Udało się! Ten komputer się uruchomił, podczas gdy inne milczą. System startuje... ale jest zablokowany hasłem."),
                    () => giveItem("sala307_komputer_uruchomiony"),
                    () => goToDialogPath("/sala/307/komputer_z_haslem"), 
                ],
                fail: [
                    () => message(`Numer ${messageInput.trim()}... Podchodzę do tego stanowiska, ale komputer nie reaguje, jest kompletnie martwy.`),
                    () => goToDialogPath("/sala/307"),
                ],
            }),
        ]
    },

    // === SALA 307 (/sala/307/komputer_z_haslem) - INTERAKCJA Z URUCHOMIONYM KOMPUTEREM ===
    {
        description: "Co widzisz na ekranie tego komputera?",
        isInput: false,
        path: "/sala/307/komputer_z_haslem",
        ifNotHas:["sala307_ekran_opisany"],
        priority: 2,
        actions: [
            () => message("Na ekranie jest standardowy prośba o hasło."),
            () => giveItem("sala307_ekran_opisany"),
            () => goToDialogPath("/sala/307/komputer_z_haslem"),
        ]
    },
    {
        description: "Przyjrzyj się dokładnie temu komputerowi",
        isInput: false,
        path: "/sala/307/komputer_z_haslem",
        ifNotHas:["sala307_dioda_znaleziona"],
        priority: 2,
        actions: [
            () => message("Obudowa wygląda normalnie, nie ma na niej żadnych napisów. Ale zauważyłem coś jeszcze mała dioda LED, która zwykle pewnie miga nieregularnie sygnalizując pracę dysku, teraz miga w bardzo dziwny, regularny sposób. Raz krótko, raz dłużej."),
            () => giveItem("sala307_dioda_znaleziona"), 
            () => goToDialogPath("/sala/307/komputer_z_haslem"),
        ]
    },
    {
        description: "W jaki dokładnie sposób mryga ta dioda",
        isInput: false,
        path: "/sala/307/komputer_z_haslem",
        ifHas: ["sala307_dioda_znaleziona"],
        priority: 2,
        actions: [
            // Załóżmy, że hasło to "SYSTEM"
            // S = ... (krótko-krótko-krótko)
            // Y = -.-- (długo-krótko-długo-długo) - dla uproszczenia "Y" może być tylko "długo" jeśli "T" nie ma.
            // S = ...
            // T = - (długo)
            // E = . (krótko)
            // M = -- (długo-długo)
            // Dla przykładu uproszczona sekwencja, np. dla słowa "TEST" (długo / krótko / krótko-krótko-krótko / długo)
            () => message("OK. Obserwuję uważnie. To jest tak: długie mignięcie, potem krótkie, potem trzy krótkie mignięcia, i na końcu znów długie mignięcie. Potem jest dłuższa przerwa i sekwencja się powtarza"),
            () => message("Nie mam pojęcia, co to może być, ale jest bardzo regularne."),
            () => goToDialogPath("/sala/307/komputer_z_haslem"),
        ]
    },
    {
        description: "Myślę, że znam hasło.",
        isInput: false,
        path: "/sala/307/komputer_z_haslem",
        ifNotHas: ["sala307_komputer_odblokowany"],
        priority: 3,
        actions: [
            () => message("Naprawdę? To by było coś! Jakie hasło mam wpisać?"),
            () => goToDialogPath("/sala/307/wpisz_haslo_morsa"),
        ]
    },

    // === SALA 307 (/sala/307/wpisz_haslo_morsa) - WPISYWANIE HASŁA Z MORSE'A ===
    {
        description: "Wpisz hasło:",
        isInput: true,
        path: "/sala/307/wpisz_haslo_morsa",
        priority: 1,
        actions: [
            // Załóżmy, że miganie (długie, krótkie, krótkie-krótkie-krótkie, długie) to "TEST"
            ({messageInput}) => solvePuzzle("TEST", messageInput.toUpperCase().trim(), {
                success: [
                    () => message(`Wpisuję "${messageInput.toUpperCase().trim()}"... Tak! Zalogowałem się! Komputer odblokowany!`),
                    () => message("Na pulpicie jest tylko jeden plik wykonywalny, nazywa się 'DOSTEP_CD.exe'."),
                    () => giveItem("sala307_komputer_odblokowany"),
                    () => goToDialogPath("/sala/307/komputer_odblokowany_desktop"),
                ],
                fail: [
                    () => message(`"${messageInput.toUpperCase().trim()}"... Niestety, to hasło nie pasuje.`),
                    () => goToDialogPath("/sala/307/komputer_z_haslem"), // Wróć do obserwacji diody
                ],
            }),
        ]
    },

    // === SALA 307 (/sala/307/komputer_odblokowany_desktop) - PO ZALOGOWANIU ===
    {
        description: "Uruchom plik 'DOSTEP_CD.exe'.",
        isInput: false,
        path: "/sala/307/komputer_odblokowany_desktop",
        ifNotHas: ["kawalek_karty_307"], // Jeśli jeszcze nie ma nagrody
        priority: 1,
        actions: [
            () => message("Uruchamiam 'DOSTEP_CD.exe'... Chwilę coś przetwarzało... Słyszę mechaniczny dźwięk! Tacka napędu CD-ROM w tym komputerze właśnie się wysunęła!"),
            () => message("A w środku, na tacce, leży... tak! Kolejny kawałek karty!"),
            () => giveItem("kawalek_karty_307"),
            () => giveItem("sala307_zagadka_rozwiazana"), // Flaga ogólna dla sali
            () => goToDialogPath("/sala/307"), // Powrót do głównego widoku sali
        ]
    },

    // === SALA 307 (/sala/307/goto) - NAWIGACJA ===
    {
        description: "Idź do...",
        isInput: false,
        path: "/sala/307",
        priority: 1,
        actions: [
            () => goToDialogPath("/sala/307/goto"),
        ]
    },
    {
        description: "Jednak nie ważne.",
        isInput: false,
        path: "/sala/307/goto",
        priority: 1,
        actions: [
            () => message("Ok, zostaję tutaj."),
            () => goToDialogPath("/sala/307"),
        ]
    },
    {
        description: "Biblioteki",
        isInput: false,
        path: "/sala/307/goto",
        priority: 1,
        actions: [
            () => message("Okej idę do biblioteki."),
            () => goToDialogPath("/biblioteka"),
        ]
    },
    {
        description: "Sali 101",
        isInput: false,
        path: "/sala/307/goto",
        priority: 1,
        actions: [
            () => message("Dobrze, idziemy do sali 101."),
            () => goToDialogPath("/sala/101"),
        ]
    },
    {
        description: "Sali 214",
        isInput: false,
        path: "/sala/307/goto",
        priority: 1,
        actions: [
            () => message("W porządku, kierunek sala 214."),
            () => goToDialogPath("/sala/214"),
        ]
    },
];

export default dialogsSala307;
