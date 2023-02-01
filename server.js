const express = require('express');
const cors = require("cors");
const Datastore = require('nedb'); //  on importe la librairie Nedb comme ceci

const app = express();
const port = 3000;

const database = new Datastore('quickdocsdb.db');  // On instancie la nouvelle BDD et on la nomme
database.loadDatabase() // la fonction pour la créer dans notre dossier et lancer le serveur

// middleware pour la connexion entre notre application et notre BDD MySQL
app.use(cors());    // (Cross-Origin Resource Sharing). Permet de contrôler les accès à une API provenant de domaines externes et protéger les ressources.
app.use(express.json()); //req.body
app.use(express.urlencoded({extended: true}));  // permet d'accéder aux différents champs de formulaire




// // créons une BDD
// const Datastore = require('nedb'); // On charge la librairie
// const database = new Datastore('database.db');  // On instancie la libraire.
// database.loadDatabase(); // On la charge pour qu'elle se créé en local
// console.log('Hello!');


app.listen(port, () => {
    console.log(`L'application est lancée sur le port : ${port}`);
  });