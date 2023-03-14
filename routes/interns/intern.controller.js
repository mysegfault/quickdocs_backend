require('dotenv').config()
const { google } = require('googleapis'); // pour utiliser l'API de google



//  Cette fonction sert à récupérer toutes les informations d'un stagiaire dont on a besoin pour remplir le template de document à éditer
exports.getOneIntern = (async (req, res) => {
    try {

        // en fonction de l'index de la ligne du code du stagiaire
        const { id } = req.params;
        console.log(req.params.id);

        // ------------------------- ACCES SPREADSHEET------------------------------
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json", // le nom du fichier comprenant notre clé sheet
            scopes: "https://www.googleapis.com/auth/spreadsheets" // URL de l'API google sheets
        })

        // creation d'un client pour auth
        const client = await auth.getClient();

        // Créons un objet google sheet. On l'utilisera pour accéder à nos informations
        const googleSheets = google.sheets({ version: "v4", auth: client })

        // On stocke l'id de notre feuille de calcul dans une variable pour la réutiliser plus facilement après.
        // Dans le lien de notre fichier sheets, c'est la partie entre "...d/" et "/edit..."
        const spreadsheetId = `${process.env.SHEET_INTERNS_ID}`; // l'id de la feuille de calcul
        const range = "stagiaires!A2:Z" // A partir de la ligne 2 sur les colonnes de A à M
        // Note : chaque ligne est stockée dans un tableau



        // ------------------------------ ACCES DATA INSIDE -------------------------

        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range
        });


        const rows = getRows.data.values;
        // console.log(rows);

        // trouver la ligne qui correspond à l'id transmis - 1 car le sheet commence à 1 mais les tableaux à l'index 0
        const row = rows[id - 1];

        if (!row) {
            return res.status(404).json({ message: "Intern not found" });
        }

        const [intern_code,
            intern_genre,
            intern_lastname,
            intern_firstname,
            intern_adress,
            intern_zipcode,
            intern_city,
            intern_program,
            program_duration,
            module_format,
            intern_firstdate,
            intern_lastdate,
            intern_duration,
            intern_achievement,
            intern_finance,
            number_convention,
            module_number,
            program_format,
            number_intern,
            training_cost,
            learning_cost,
            total_cost,
            deposit,
            convention_date,
            first_training_date ] = row;

        const internInfo = {
            intern_code,
            intern_genre,
            intern_lastname,
            intern_firstname,
            intern_adress,
            intern_zipcode,
            intern_city,
            intern_program,
            program_duration,
            module_format,
            intern_firstdate,
            intern_lastdate,
            intern_duration,
            intern_achievement,
            intern_finance,            
            number_convention,
            module_number,
            program_format,
            number_intern,
            training_cost,
            learning_cost,
            total_cost,
            deposit,
            convention_date,
            first_training_date };


        res.json(internInfo);
        console.log(internInfo);


    } catch (err) {
        console.error(err.message);
    }
});



// Cette fonction sert à ajouter un stagiaire dans la BDD des stagiaires.
exports.postOneIntern = (async (req, res) => {
    try {
        // ------------------------- ACCES SPREADSHEET------------------------------
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json", // le nom du fichier comprenant notre clé sheet
            scopes: "https://www.googleapis.com/auth/spreadsheets" // URL de l'API google sheets
        })

        // creation d'un client pour auth
        const client = await auth.getClient();

        // Créons un objet google sheet. On l'utilisera pour accéder à nos informations
        const googleSheets = google.sheets({ version: "v4", auth: client })

        // On stocke l'id de notre feuille de calcul dans une variable pour la réutiliser plus facilement après.
        // Dans le lien de notre fichier sheets, c'est la partie entre "...d/" et "/edit..."
        const spreadsheetId = `${process.env.SHEET_INTERNS_ID}`; // l'id de la feuille de calcul
        const range = "stagiaires!A2:Z" // A partir de la ligne 2 sur les colonnes de A à M
        // Note : chaque ligne est stockée dans un tableau



        // ------------------------------ ACCES DATA INSIDE --------------------------

        const {
            intern_code,
            intern_genre,
            intern_lastname,
            intern_firstname,
            intern_adress,
            intern_zipcode,
            intern_city,
            intern_program,
            program_duration,
            module_format,
            intern_firstdate,
            intern_lastdate,
            intern_duration,
            intern_achievement,
            intern_finance,
            number_convention,
            module_number,
            program_format,
            number_intern,
            training_cost,
            learning_cost,
            total_cost,
            deposit,
            convention_date,
            first_training_date } = req.body


        const response = await googleSheets.spreadsheets.values.append({
            auth, // l'accès
            spreadsheetId, // l'id de la feuille de ca calcul
            range, // l'endroit dans la feuille de calcul ou l'on souhaite enregistrer les infos
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [intern_code,
                        intern_genre,
                        intern_lastname,
                        intern_firstname,
                        intern_adress,
                        intern_zipcode,
                        intern_city,
                        intern_program,
                        program_duration,
                        module_format,
                        intern_firstdate,
                        intern_lastdate,
                        intern_duration,
                        intern_achievement,
                        intern_finance,
                        number_convention,
                        module_number,
                        program_format,
                        number_intern,
                        training_cost,
                        learning_cost,
                        total_cost,
                        deposit,
                        convention_date,
                        first_training_date ]
                ]
            }
        });

        res.send(response.config.data.values[0])
        console.log(response.config.data.values[0]);


    } catch (err) {
        console.error(err.message);
    }
});

// Cette fonction permet de récupérer l'id du stagiaire dont on a rentrer le "code stagiaire" dans le champs en front.
exports.postInternToReturn = (async (req, res) => {
    try {
        // ------------------------- ACCES SPREADSHEET------------------------------
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json", // le nom du fichier comprenant notre clé sheet
            scopes: "https://www.googleapis.com/auth/spreadsheets" // URL de l'API google sheets
        })

        // creation d'un client pour auth
        const client = await auth.getClient();

        // Créons un objet google sheet. On l'utilisera pour accéder à nos informations
        const googleSheets = google.sheets({ version: "v4", auth: client })

        // On stocke l'id de notre feuille de calcul dans une variable pour la réutiliser plus facilement après.
        // Dans le lien de notre fichier sheets, c'est la partie entre "...d/" et "/edit..."
        const spreadsheetId = `${process.env.SHEET_INTERNS_ID}`; // l'id de la feuille de calcul
        const range = "stagiaires!A2:A" // Dans la colonne A, à partie de la ligne 2 pour éviter les titres.



        // ------------------------------ ACCES DATA INSIDE --------------------------

        const { intern_code: intern_code } = req.body

        const response = await googleSheets.spreadsheets.values.get({
            auth, // l'accès
            spreadsheetId, // l'id de la feuille de ca calcul
            range, // l'endroit dans la feuille de calcul ou on recherche notre données
        });

        // Toutes les données de la colonne A donc tous les code de satgaires.
        // Attention allInternCode est un tableau de tableaux.
        const allInternCode = response.data.values
        console.log("allInternCode ici: ", allInternCode);

        console.log("intern_code ici: ", intern_code);

        let index = -1;

        for (let i = 0; i < allInternCode.length; i++) {
            const codes = allInternCode[i];
            if (codes.includes(intern_code)) {
                index = i;
                break;
            }
        }
        console.log("index ici: ", index);

        const id = index + 1;
        console.log("id ici: ", id);


        res.json(id)
        console.log(id);


    } catch (err) {
        console.error(err.message);
    }
});


// Cette fonction retourne tous les "code stagiaires" pour les proposer dans le champs concerné (mat-autocomplete en front).
exports.getAllCodeIntern = (async (req, res) => {
    try {
        // ------------------------- ACCES SPREADSHEET------------------------------
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json", // le nom du fichier comprenant notre clé sheet
            scopes: "https://www.googleapis.com/auth/spreadsheets" // URL de l'API google sheets
        })

        // creation d'un client pour auth
        const client = await auth.getClient();

        // Créons un objet google sheet. On l'utilisera pour accéder à nos informations
        const googleSheets = google.sheets({ version: "v4", auth: client })

        // On stocke l'id de notre feuille de calcul dans une variable pour la réutiliser plus facilement après.
        // Dans le lien de notre fichier sheets, c'est la partie entre "...d/" et "/edit..."
        const spreadsheetId = `${process.env.SHEET_INTERNS_ID}`; // l'id de la feuille de calcul
        const range = "stagiaires!A2:A" // Dans la colonne A, à partie de la ligne 2 pour éviter les titres.



        // ------------------------------ ACCES DATA INSIDE --------------------------

        const { intern_code: intern_code } = req.body

        const response = await googleSheets.spreadsheets.values.get({
            auth, // l'accès
            spreadsheetId, // l'id de la feuille de ca calcul
            range, // l'endroit dans la feuille de calcul ou on recherche notre données
        });

        // Toutes les données de la colonne A donc tous les code de satgaires.
        // Attention allInternCode est un tableau de tableaux.
        const allInternCode = response.data.values
        console.log("allInternCode ici: ", allInternCode);


        res.json(allInternCode)
        console.log(allInternCode);


    } catch (err) {
        console.error(err.message);
    }
});