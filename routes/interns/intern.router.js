const express = require("express");
const router = express.Router();
const { getOneIntern, postOneIntern, postInternToReturn, getAllCodeIntern } = require('./intern.controller');



router.route('/intern/:id')
    .get(getOneIntern)

router.route('/intern')
    .post(postOneIntern)

router.route('/interns')
    .post(postInternToReturn)

router.route('/internscodes')
    .get(getAllCodeIntern)

    

module.exports = router;