const express = require("express");
const router = express.Router();
const { postAuthUser } = require('./user.controller');


router.route('/user/:id')
    .post(postAuthUser)


module.exports = router;