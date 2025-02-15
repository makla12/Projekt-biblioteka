const dialogs = [
    //Początkowy dialog
    {
        "description":"Tak",
        "isInput":false,
        "path":"/",
        "action":"message:No i git;dialog:/startDialog2"
    },

    {
        "description":"Nie",
        "isInput":false,
        "path":"/",
        "action":"message:Rudy cel;dialog:/"
    },

    //Biblioteka
    {
        "description":"Idz do...",
        "isInput":false,
        "path":"/biblioteka",
        "action":"dailog:/goto"
    },

    {
        "description":"307",
        "isInput":false,
        "path":"/biblioteka/goto",
        "action":"dilog:/307"
    },
    {
        "description":"101",
        "isInput":false,
        "path":"/biblioteka/goto",
        "action":"dialog:/101"
    },
    {
        "description":"214",
        "isInput":false,
        "path":"/biblioteka/goto",
        "action":"dialog:/214"
    },


    {
        "description":"Rozwiąż zakadkę numer 1",
        "isInput":false,
        "path":"/biblioteka",
        "action":"dialog:/puzle1"
    },
    {
        "description":"Wpisz rozwiązanie zagadki",
        "isInput":true,
        "path":"/biblioteka/puzle1",
        "action":"solve:puzle1"
    },

    //307 (Programowanie)
    {
        "description":"Idz do...",
        "isInput":false,
        "path":"/307",
        "action":"dailog:/goto"
    },

    {
        "description":"307",
        "isInput":false,
        "path":"/307/goto",
        "action":"dialog:/307"
    },
    {
        "description":"101",
        "isInput":false,
        "path":"/307/goto",
        "action":"dialog:/101"
    }
]

export default dialogs;