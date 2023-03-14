const express = require("express");
const router = express.Router();
const { postAuthUser } = require('./user.controller');


// filtre les utilisateurs autorisés en fonction de leur ID Google.
router.route('/user/:id')
    .post(postAuthUser)


module.exports = router;