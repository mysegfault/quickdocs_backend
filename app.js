const express = require('express');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const cors = require("cors");

const app = express();
const port = 3000;


const config = {
    user: process.env.BDD_user,
    password: process.env.BDD_password,
    host: "localhost",
    port: 3306,     // MySQL tourne sur ce port
    database: process.env.BDD_nameDB,
    ssl:true
}


// middleware
// pour connexion entre notre application et notre BDD MySQL
app.use(myconnection(mysql,config,'pool'))
app.use(cors({credentials: true, origin: true}))
app.use(express.json()); //req.body
// permet d'accéder aux différents champs de formulaire
app.use(express.urlencoded({extended: true}));



// pour le rafraichissement de la page
// app.get('*', (req, res) => {
//     res.redirect('/');
//   });


app.listen(port, () => {
    console.log(`L'application est lancée sur le port : ${port}`);
  });