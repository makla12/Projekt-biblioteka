const dialogs = [
    //Początkowy dialog
    {
        "description":"Tak",
        "input":false,
        "path":"/",
        "action":"dailog /goto"
    },

    //Biblioteka
    {
        "description":"Idz do...",
        "input":false,
        "path":"/biblioteka",
        "action":"dailog /goto"
    },

    {
        "description":"307",
        "input":false,
        "path":"/biblioteka/goto",
        "action":"goto 307"
    },
    {
        "description":"101",
        "input":false,
        "path":"/biblioteka/goto",
        "action":"goto 101"
    },
    {
        "description":"214",
        "input":false,
        "path":"/biblioteka/goto",
        "action":"goto 214"
    },


    {
        "description":"Rozwiąż zakadkę numer 1",
        "input":false,
        "path":"/biblioteka",
        "action":"dialog /puzle1"
    },
    {
        "description":"Wpisz rozwiązanie zagadki",
        "input":true,
        "path":"/biblioteka/puzle1",
        "action":"solve puzle1"
    },

    //307 (Programowanie)
    {
        "description":"Idz do...",
        "input":false,
        "path":"/307",
        "action":"dailog /goto"
    },

    {
        "description":"307",
        "input":false,
        "path":"/307/goto",
        "action":"goto 307"
    },
    {
        "description":"101",
        "input":false,
        "path":"/307/goto",
        "action":"goto 101"
    }
]

export default dialogs;