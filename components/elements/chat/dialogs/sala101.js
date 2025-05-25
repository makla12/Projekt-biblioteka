import { message, goToDialogPath, giveItem, checkInventory, solvePuzzle } from "./dialogFunctions";

const dialogsSala101 = [
    // === SALA 101 (/sala/101) ===
    // Na razie tylko nawigacja, do rozbudowy o zagadki/interakcje
    {
        description: "Opisz mi jak wygląda sala 101.", // Przykładowa opcja eksploracji
        isInput: false,
        path: "/sala/101",
        ifNotHas: ["sala101_opisana"],
        priority: 2,
        actions: [
            () => message("Sala 101 wygląda na typową klasę lekcyjną. Kilkanaście ławek, tablica, biurko nauczyciela. Na ścianach wiszą jakieś mapy historyczne. Może coś tu znajdziemy?"),
            () => giveItem("sala101_opisana"),
            () => goToDialogPath("/sala/101"),
        ]
    },
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
