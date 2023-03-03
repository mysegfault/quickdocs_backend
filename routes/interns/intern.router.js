const express = require("express");
const router = express.Router();
const { getOneIntern, postOneIntern, postInternToReturn } = require('./intern.controller');



router.route('/intern/:id')
    .get(getOneIntern)

router.route('/intern')
    .post(postOneIntern)

router.route('/interns')
    .post(postInternToReturn)

    

module.exports = router;