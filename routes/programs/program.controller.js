require('dotenv').config()
const { google } = require('googleapis'); // pour utiliser l'API de google


// Fonction qui permet de récupérer (pour afficher) tous les titre de programme, sur la route /programs
exports.getProgramsList = (async (req, res) => {
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
        const spreadsheetId = `${process.env.SHEET_PROGRAMS_ID}`; // l'id de la feuille de calcul
        const range = "bdd_programmes!A2:A500" // A partir de la ligne 2, toute la colonnes A 
        // Note : chaque ligne est stockée dans un tableau



        // ------------------------------ ACCES DATA INSIDE --------------------------

        const getTitle = await googleSheets.spreadsheets.values.get({
            auth, // l'accès
            spreadsheetId,
            range
        });

        const titles = getTitle.data.values;

        res.send(titles);
        console.log(titles);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to get programs from database' });
    }
});


// Cette fonction sert à récupérer la ligne complète d'un seul programme.
exports.getOneProgram = (async (req, res) => {
    try {

        // en fonction de l'id de la ligne du programme
        const { id } = req.params;
        // console.log(req.params.id);

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
        const spreadsheetId = `${process.env.SHEET_PROGRAMS_ID}`;
        const range = "bdd_programmes!A:AS"; // On parcours tout le tableau
        // Note : chaque ligne est stockée dans un tableau


        // ------------------------------ ACCES DATA INSIDE --------------------------
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
            return res.status(404).json({ message: "Program not found" });
        }

        // On map les valeurs dans un objet.
        const [titre_programme,
            chapeau_titre,
            version_programme,
            introduction,
            chapeau_introduction,
            prix_formation,
            frais_dossier,
            titre_photo_recto,
            sous_titre_photo_recto,
            titre_footer,
            footer,
            footer_info_sasu,
            intit_objectifs,
            cont_objectifs,
            intit_duree,
            cont_duree,
            intit_dates,
            cont_dates,
            intit_public,
            cont_public,
            intit_prerequis,
            cont_pre_requis,
            sous_prerequis,
            intitule_page_verso,
            chapeau_intitule_verso,
            titre_programme_generique,
            contenu_programme_generique,
            titre_programme_autre,
            contenu_programme_autre,
            nom_formateur,
            metier,
            information_formateur,
            intit_moyens_peda,
            cont_moyens_peda,
            intit_accessibilite,
            cont_accessibilite,
            intit_delai,
            cont_delai,
            intit_qualite,
            cont_qualite,
            photo_entete_recto,
            photo_cont_recto,
            photo_entete_verso,
            photo_cont_verso,
            logo] = row;

        const program = {
            titre_programme,
            chapeau_titre,
            version_programme,
            introduction,
            chapeau_introduction,
            prix_formation,
            frais_dossier,
            titre_photo_recto,
            sous_titre_photo_recto,
            titre_footer,
            footer,
            footer_info_sasu,
            intit_objectifs,
            cont_objectifs,
            intit_duree,
            cont_duree,
            intit_dates,
            cont_dates,
            intit_public,
            cont_public,
            intit_prerequis,
            cont_pre_requis,
            sous_prerequis,
            intitule_page_verso,
            chapeau_intitule_verso,
            titre_programme_generique,
            contenu_programme_generique,
            titre_programme_autre,
            contenu_programme_autre,
            nom_formateur,
            metier,
            information_formateur,
            intit_moyens_peda,
            cont_moyens_peda,
            intit_accessibilite,
            cont_accessibilite,
            intit_delai,
            cont_delai,
            intit_qualite,
            cont_qualite,
            photo_entete_recto,
            photo_cont_recto,
            photo_entete_verso,
            photo_cont_verso,
            logo
        };

        console.log(program);
        res.send(program);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to get programs from database' });
    }
});