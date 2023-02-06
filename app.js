const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/', () =>{
    console.log('Connected to the database');
})
// const axios = require('axios'); //  Axios est un client HTTP basé sur les promesses, compatible avec node.js et les navigateurs.
// connection


const app = express();
const port = 3000;

// middleware pour la connexion entre notre application et notre BDD
app.use(cors());  //  (Cross-Origin Resource Sharing). Permet de contrôler les accès à une API provenant de domaines externes et protéger les ressources.
// app.use(cors({credentials: true, origin: true}))
app.use(express.json()); //req.body
app.use(express.urlencoded({extended: false}));  // permet d'accéder aux différents champs de formulaire. {extended: false} indique à Express d'utiliser un parseur simple


// Routes : checked!
// app.get('/', (req, res) =>{
//   res.send('Here we are')
// })




app.listen(port, () => {
    console.log(`L'application est lancée sur le port : ${port}`);
  });