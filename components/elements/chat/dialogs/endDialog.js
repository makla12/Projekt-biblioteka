import { message, goToDialogPath, checkInventory } from "./dialogFunctions";

const endMessages = [
    () => checkInventory(["kawalek_karty_307", "kawalek_karty_214", "kawalek_karty_101"], [
        () => message("To już ostatni kawałek karty w końcu mogę się stąd wydostać"),
        () => message("Bardzo dziękuje za twoją pomoc"),
        () => goToDialogPath("/endDialog"),
    ]),
]

const dialogEnd = [

]

export { endMessages };
export default dialogEnd;
