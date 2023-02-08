const express = require('express');
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI, () =>{
    console.log('Connected to the database');
})

// chemin quand il y aura l'auth
// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect(process.env.MONGO_URI, () =>{
//         console.log('Connected to the database');
//     })
// }


// import des routes
const routerUser = require('./routes/users/user.router');
const routerCourse = require('./routes/courses/course.router');
const routerGrid = require('./routes/grids/grid.router');


const app = express();
const port = 3000;



// middleware pour la connexion entre notre application et notre BDD
app.use(cors())  //  (Cross-Origin Resource Sharing). Permet de contrôler les accès à une API provenant de domaines externes et protéger les ressources.
// app.use(cors({credentials: true, origin: true}))
app.use(express.json()); //req.body
app.use(express.urlencoded({extended: false}));  // permet d'accéder aux différents champs de formulaire. {extended: false} indique à Express d'utiliser un parseur simple


// mobilisation des routers
app.use(routerUser, routerCourse, routerGrid)



app.listen(port, () => {
    console.log(`L'application est lancée sur le port : ${port}`);
  });