const express = require("express");
const router = express.Router();
const { getProgramsList, getOneProgram } = require('./program.controller');



router.route('/programmes')
    .get(getProgramsList)

router.route('/program_recto')
    .get(getOneProgram)

router.route('/program_verso')
    .get(getOneProgram)



module.exports = router;