const express = require("express");
const cors = require("cors"); //  (Cross-Origin Resource Sharing). Permet de contrôler les accès à une API provenant de domaines externes et protéger les ressources.
require('dotenv').config();
const axios = require('axios'); // Promise based HTTP client for the browser and node.js
const session = require('express-session');
const passport = require('passport');
require('./middleware/passport');


// -------------------Mongoose---------------------------
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
// -------------------------------------------------------


// import des routes
const routerConnection = require('./routes/connections/connection.router');
const routerProgram = require('./routes/programs/program.router');

const app = express();
const port = 3000;


// middleware pour la connexion entre notre application et notre BDD
app.use(cors({ credentials: true, origin: true }));
app.use(express.json()); //req.body
app.use(express.urlencoded({extended: false}));  // permet d'accéder aux différents champs de formulaire. {extended: false} indique à Express d'utiliser un parseur simple


// mobilisation des routers
app.use(routerProgram, routerConnection);


// ------------------------------------middelware pour le passport-----------------------------------------
app.use(session({
  secret: 'Authentification',
  resave: false,
  saveUninitialized: false
}));


// Initialiser Passport et l'ajouter au middleware de l'application
app.use(passport.initialize());
app.use(passport.session());

// notre middleware qui permet de voir si l'utilisateur s'est connecté lorsqu'il essaye d'accéder à l'applications
// On place ce middleware sur la route /success (plus tard: /programmes)
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// ---------------------------------------------------------------


// ------------------------------------routes pour le passport-----------------------------------------

// Si succès de la connexion (mais ce sera supprimer par la suite puisqu'on sera rediriger vers la page /programmes directement)
app.get("/success", isLoggedIn, (req, res) => {
  res.send(`Bienvenue ${req.user.displayName}`)
})


//  pour s'authentifier avec son compte google
app.get('/google', passport.authenticate('google', {
          scope:
              ['email', 'profile']
      }
  ));


  // chemin de redirection grâce à authentificate, qui nous mène soit à /echec soit à /success (ou plus tard à /programmes)
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed'}),
  // Succès d'authentification, on redirige vers la page qui nous interesse( changer par /programmes)
  function (req, res) {
      res.redirect('/success')
  }
);

// ------------------------------------------------------------------------------





app.listen(port, () => {
    console.log(`L'application est lancée sur le port : ${port}`);
  });