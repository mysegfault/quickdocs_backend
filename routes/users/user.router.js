const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require("../../models/user_model");
const { auth, getUsers, postUser, postLogin, getUser, putUser, deleteUser} = require('./user.controller');




router.route('/users')
    .get(getUsers)



router.route('/register')
    .post(postUser)

router.route('/login')
    .post(postLogin)

router.route('/user')
    .get(auth, getUser)

router.route('/user/:id')
    .patch(putUser)
    .delete(deleteUser)

module.exports = router;