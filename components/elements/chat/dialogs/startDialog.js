import { message, goToDialogPath, giveItem, checkInventory, solvePuzzle } from "./dialogFunctions";

const startDialog = [
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
];

export default startDialog;
