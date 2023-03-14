const express = require("express");
const router = express.Router();
const { getProgramsList, getOneProgram } = require('./program.controller');


// permet de récupérer tous les titres des programmes
router.route('/programmes')
    .get(getProgramsList)

// permet de récupérer toutes les informations d'un programme en fonction de son id. 
router.route('/programme/:id')
    .get(getOneProgram)


    
module.exports = router;