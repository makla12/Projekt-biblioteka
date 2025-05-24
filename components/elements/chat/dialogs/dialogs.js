import startDialog from "./startDialog";
import dialogsBiblioteka from "./biblioteka";
import dialogsSala101 from "./sala101";
import dialogsSala214 from "./sala214";
import dialogsSala307 from "./sala307";

const firstMessages = [
    { message: "Halo...? Jest tu kto? Słyszycie mnie?", self: false },
    { message: "Jestem Amper, utknęłem w szkolnej bibliotece! Wszystko pozamykane, a ja nie mogę otworzyć drzwi!", self: false },
    { message: "Na dworze już ciemno... Pomożesz mi się stąd wydostać?", self: false },
];

const dialogs = [
    ...startDialog,
    ...dialogsBiblioteka,
    ...dialogsSala101,
    ...dialogsSala214,
    ...dialogsSala307,
];

export { dialogs, firstMessages };
