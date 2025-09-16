import { message, goToDialogPath, checkInventory } from "./dialogFunctions";

const endMessages = [
    () => checkInventory(["kawalek_karty_307", "kawalek_karty_214", "kawalek_karty_101"],[
                () => message("To już ostatni kawałek karty w końcu mogę się stąd wydostać"),
                () => message("Słuchajcie na lekcjach pana suchojada bo inaczej byście nie wiedzieli jak to zrobić"),
                () => message("Bardzo dziękuje za twoją pomoc"),
                () => message("(TEMP) (można napisać tutaj coś o nagrodzie)"),
                () => goToDialogPath("/endDialog"),
    ]),
]

const dialogEnd = [

]

export { endMessages };
export default dialogEnd;
