const express = require("express");
const cors = require("cors");
require('dotenv').config();
const axios = require('axios'); // Promise based HTTP client for the browser and node.js
const passport = require('passport');



// const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGO_URI, () => {
//     console.log('Connected to the database');
// })

// chemin quand il y aura l'auth
// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect(process.env.MONGO_URI, () =>{
//         console.log('Connected to the database');
//     })
// }


// import des routes
// const routerUser = require('./routes/users/user.router');
const routerProgram = require('./routes/programs/program.router');

const app = express();
const port = 3000;


// middleware pour la connexion entre notre application et notre BDD
app.use(cors())  //  (Cross-Origin Resource Sharing). Permet de contrôler les accès à une API provenant de domaines externes et protéger les ressources.
// app.use(cors({credentials: true, origin: true}))
app.use(express.json()); //req.body
app.use(express.urlencoded({extended: true}));  // permet d'accéder aux différents champs de formulaire. {extended: false} indique à Express d'utiliser un parseur simple


// mobilisation des routers
app.use(routerProgram)
// routerUser, 

// app.get("/", async (req, res) => {

//     const auth = new google.auth.GoogleAuth({
//         keyFile: "credentials.json", // le nom du fichier comprenant notre clé sheet
//         scopes: "https://www.googleapis.com/auth/spreadsheets" // URL de l'API google sheets
//     })

//     // creation d'un client pour auth
//     const client = await auth.getClient();

//     // Créons un objet google sheet. On l'utilisera pour accéder à nos informations
//     const googleSheets = google.sheets({version: "v4", auth: client})

//     // On stocke l'id de notre feuille de calcul dans une variable pour la réutiliser plus facilement après.
//     // Dans le lien de notre fichier sheets, c'est la partie entre "...d/" et "/edit..."
//     const spreadsheetId = "1kbbO4MP3NcBRPoJnZFQz5MZXi604GuJy2KzBuWzZFo0";

//     // Test pour vérifier qu'arrive à accéder à notre feuille de calcul
//     const metaData = await googleSheets.spreadsheets.get({
//         auth, // l'accès
//         spreadsheetId // l'id de la feuille de calcul
//     });

//     // Test de lecture de lignes : 
//     const getRows = await googleSheets.spreadsheets.values.get({
//         auth, 
//         spreadsheetId,
//         range: "bdd_programmes" // le nom de la feuille de calcul souhaitée + les colonnes (lettres) et ou  les lignes (chiffre) qu'on souhaite afficher. Note : chaque ligne est stockée dans un tableau
//     });


//     res.send(getRows.data);
// })

app.listen(port, () => {
    console.log(`L'application est lancée sur le port : ${port}`);
  });