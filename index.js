const express = require("express");
const { google } = require('googleapis'); // pour utiliser l'API de google

const app = express();
const port = 3000;


app.get("/", async (req, res) => {

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

    // Test pour vérifier qu'arrive à accéder à notre feuille de calcul
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

    // Test pour écrire des données : 
    // await googleSheets.spreadsheets.values.append({
    //     auth, 
    //     spreadsheetId,
    //     range: "bdd_programmes!A:B",
    //     valueInputOption: "USER_ENTERED", // 2 options utiles possible Raw (valeurs stockées telles quelles) et USER_ENTERED (les valeurs seront analysées voir le format sera changé)
    //     resource: {
    //         values: [
    //             ["Test", "Test3"], ["test","testB"] // chaque ligne à son tableau (1 ligne = 1 array)
    //         ], // qu'on rentre dans un tableau de valeurs.
    //     }
    // })


    res.send(getRows.data);
})

app.listen(port, () => {
    console.log(`L'application est lancée sur le port : ${port}`);
  });