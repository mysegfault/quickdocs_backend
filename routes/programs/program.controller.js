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
        const googleSheets = google.sheets({version: "v4", auth: client})
    
        // On stocke l'id de notre feuille de calcul dans une variable pour la réutiliser plus facilement après.
        // Dans le lien de notre fichier sheets, c'est la partie entre "...d/" et "/edit..."
        const spreadsheetId = process.env.SHEET_ID;



        // ------------------------------ ACCES DATA INSIDE --------------------------
 
        // const { program_title } = req.body

        const getRows = await googleSheets.spreadsheets.values.get({
            auth, // l'accès
            spreadsheetId, // l'id de lea feuille de calcul
            range: "bdd_programmes!A2:A100", // le nom de la feuille de calcul souhaitée + les colonnes (lettres) et ou  les lignes (chiffre) qu'on souhaite afficher. Note : chaque ligne est stockée dans un tableau
        });
    
    
        res.send(getRows.data.values);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to get programs from database' });
    }
});

exports.getOneProgram = (async (req, res) => {
    try {

        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json", // le nom du fichier comprenant notre clé sheet
            scopes: "https://www.googleapis.com/auth/spreadsheets" // URL de l'API google sheets
        })
    
        // creation d'un client pour auth
        const client = await auth.getClient();
    
        // Créons un objet google sheet. On l'utilisera pour accéder à nos informations
        const googleSheets = google.sheets({version: "v4", auth: client})
    
        // On stocke l'id de notre feuille de calcul dans une variable pour la réutiliser plus facilement après.
        // Dans le lien de notre fichier sheets, c'est la partie entre "...d/" et "/edit..."
        const spreadsheetId = "1kbbO4MP3NcBRPoJnZFQz5MZXi604GuJy2KzBuWzZFo0";
    
        // Test pour vérifier qu'on arrive à accéder à notre feuille de calcul
        const metaData = await googleSheets.spreadsheets.get({
            auth, // l'accès
            spreadsheetId // l'id de lea feuille de calcul
        });
    
        // Test de lecture de lignes : 
        const getRows = await googleSheets.spreadsheets.values.get({
            auth, 
            spreadsheetId,
            range: "bdd_programmes" // le nom de la feuille de calcul souhaitée + les colonnes (lettres) et ou  les lignes (chiffre) qu'on souhaite afficher. Note : chaque ligne est stockée dans un tableau
        });
    
    
        res.send(getRows.data);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to get programs from database' });
    }
})