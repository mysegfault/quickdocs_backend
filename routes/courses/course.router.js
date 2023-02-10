const express = require("express");
const router = express.Router();
const { getAllCourses, getOneCourse } = require('./course.controller');
// postOneCourse

router.route('/programmes')
    .get(getAllCourses)

// router.route('/pdf')
//     .post(postOneCourse)

router.route('/pdf/:id')
    .get(getOneCourse)


module.exports = router;