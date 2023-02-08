const express = require("express");
const router = express.Router();
const { auth, getUsers, postUser, postLogin, getUser, putUser, deleteUser } = require('./user.controller');


// Les routes utiles pour le front
router.route('/login')
    .post(postLogin)

router.route('/user')
    .get(auth, getUser)

router.route('/user/:id')
    .patch(putUser)
    .delete(deleteUser)


// Les routes ci-dessous n'apparaitront pas en front.
router.route('/users')
    .get(getUsers)

router.route('/register')
    .post(postUser)


module.exports = router;