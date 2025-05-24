import { message, goToDialogPath, giveItem, checkInventory, solvePuzzle } from "./dialogFunctions";

const dialogsSala307 = [
    // === SALA 307 (/sala/307) ===
    // Na razie tylko nawigacja, do rozbudowy o zagadki/interakcje
    {
        description: "Opisz mi jak wygląda sala 307.", // Przykładowa opcja eksploracji
        isInput: false,
        path: "/sala/307",
        ifNotHas: ["sala307_opisana"],
        priority: 2,
        actions: [
            () => message("Sala 307 to chyba pracownia chemiczna albo fizyczna. Pełno tu dziwnego sprzętu, menzurek, probówek. Na jednym ze stołów laboratoryjnych coś migocze..."),
            () => giveItem("sala307_opisana"),
            () => goToDialogPath("/sala/307"),
        ]
    },
    {
        description: "Idz do...",
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
        description: "biblioteki",
        isInput: false,
        path: "/sala/307/goto",
        priority: 1,
        actions: [
            () => message("Okej idę do biblioteki."),
            () => goToDialogPath("/biblioteka"),
        ]
    },
    {
        description: "101",
        isInput: false,
        path: "/sala/307/goto",
        priority: 1,
        actions: [
            () => message("Dobrze, idziemy do sali 101."),
            () => goToDialogPath("/sala/101"),
        ]
    },
    {
        description: "214",
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
