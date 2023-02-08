const express = require("express");
const router = express.Router();
const { getGrids } = require('./grid.controller');



router.route('/grilles')
    .get(getGrids)



module.exports = router;