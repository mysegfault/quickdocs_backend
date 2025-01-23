require('dotenv').config()
const { google } = require('googleapis'); // pour utiliser l'API de google


// Fonction qui nous permet de filtrer les utilisateurs de Google pour ne laisser passer que les utilisateurs autorisés, en fonction de l'id Gooogle.
exports.postAuthUser = (async (req, res) => {
	
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
        const spreadsheetId = `${process.env.SHEET_USERS_ID}`; // l'id de la feuille de calcul
        const range = "users!A2:B" // A partir de la ligne 2 sur les colonnes A et B
        // Note : chaque ligne est stockée dans un tableau



        // ------------------------------ ACCES DATA INSIDE --------------------------

        const response = await googleSheets.spreadsheets.values.get({
            auth, // l'accès
            spreadsheetId,
            range,
          });
        
          const rows = response.data.values;
          console.log(rows);


        // ------------------- FILTRE EN FONCTION DES UTILISATEURS AUTORISES--------------------
        
        // on définit la const authorizedUsers pour vérifier, parmis la 1ère colonne (rang 0), celle des id google, si l'id transmis est dans la liste.
        const authorizedUsers = rows.map(col => col[0]);
        console.log(authorizedUsers);

        res.send(authorizedUsers);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to get users from database' });
    }
})
