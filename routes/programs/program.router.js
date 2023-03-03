const express = require("express");
const router = express.Router();
const { getProgramsList, getOneProgram } = require('./program.controller');



router.route('/programmes')
    .get(getProgramsList)

router.route('/programme/:id')
    .get(getOneProgram)


    
module.exports = router;