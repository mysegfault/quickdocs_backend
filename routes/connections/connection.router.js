const express = require("express");
const router = express.Router();
const { getStarted, getFailed, getLogout } = require('./connection.controller');



router.route('/')
    .get(getStarted)

router.route('/failed')
    .get(getFailed)

router.route('/logout')
    .get(getLogout)



module.exports = router;