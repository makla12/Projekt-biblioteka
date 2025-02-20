const dialogs = [
    //Początkowy dialog
    {
        "description":"Ok",
        "isInput":false,
        "path":"/startDialog",
        "action":`
            message:No i git;
            dialog:/biblioteka
        `
    },

    {
        "description":"Nie",
        "isInput":false,
        "path":"/startDialog",
        "action":`
            message:No weź;
            dialog:/startDialog
        `
    },

    //Biblioteka
    {
        "description":"Co widzisz?",
        "isInput":false,
        "path":"/biblioteka",
        "action":`
            message:Rudego cwela;
            dialog:/biblioteka
        `
    },

    {
        "description":"Rozwiąż zakadkę numer 1",
        "isInput":false,
        "path":"/biblioteka",
        "action":`
            message:Ok co mam wpisać?;
            dialog:/biblioteka/puzle1
        `
    },

    {
        "description":"Wpisz rozwiązanie zagadki",
        "isInput":true,
        "path":"/biblioteka/puzle1",
        "action":`
            solve:klucz,/biblioteka,Dobra odpowiedz dostałem klucz,rudy cel
        `
    },

    {
        "description":"Idz do",
        "isInput":false,
        "path":"/biblioteka",
        "action":`
            dialog:/biblioteka/goto
        `
    },

    {
        "description":"Jednak nie ważne",
        "isInput":false,
        "path":"/biblioteka/goto",
        "action":`
            message:Aha ok;
            dialog:/biblioteka
        `
    },

    {
        "description":"307",
        "isInput":false,
        "path":"/biblioteka/goto",
        "action":`
            check:klucz,/biblioteka,Nie mam klucza;
            message:Ok już jestem;
            dialog:/307
        `
    },

    {
        "description":"101",
        "isInput":false,
        "path":"/biblioteka/goto",
        "action":`
            check:klucz,/biblioteka,Nie mam klucza;
            message:Ok już jestem;
            dialog:/101
        `
    },

    {
        "description":"214",
        "isInput":false,
        "path":"/biblioteka/goto",
        "action":`
            check:klucz,/biblioteka,Nie mam klucza;
            message:Ok już jestem;
            dialog:/214
        `
    },
]

export default dialogs;