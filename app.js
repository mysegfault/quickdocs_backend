const express = require("express");
const cors = require("cors"); //  (Cross-Origin Resource Sharing). Permet de contrôler les accès à une API provenant de domaines externes et protéger les ressources.
const corsOptions = {
  credentials: true,
  origin: true
};


// import des routes
const routerProgram = require('./routes/programs/program.router');
const routerUser = require('./routes/users/user.router');
const routerIntern = require('./routes/interns/intern.router');


const app = express();
const port = 3000;


// middleware pour la connexion entre notre application et notre BDD
app.use(cors(corsOptions));
app.use(express.json()); //req.body
app.use(express.urlencoded({extended: false}));  // permet d'accéder aux différents champs de formulaire. {extended: false} indique à Express d'utiliser un parseur simple


// mobilisation des routers
app.use(routerProgram, routerUser, routerIntern);




app.listen(port, () => {
    console.log(`L'application est lancée sur le port : ${port}`);
  });