const express = require("express");
const router = express.Router();
const { getOneIntern, postOneIntern, postInternToReturn, getAllCodeIntern } = require('./intern.controller');


// chemin pour récupérer toutes les informations d'un stagiaire 
router.route('/intern/:id')
    .get(getOneIntern)

// chemin pour ajouter un stagiaire dans la BDD des stagiaires.
router.route('/intern')
    .post(postOneIntern)

// Permet de récupérer l'id du stagiaire dont on a rentrer le "code stagiaire" dans le champs en front.
router.route('/interns')
    .post(postInternToReturn)

// Permet de réucpérer tous les codes de stagiaire pour les proposer dans le champs correcpondant (mat-autocomplete)
router.route('/internscodes')
    .get(getAllCodeIntern)

    

module.exports = router;