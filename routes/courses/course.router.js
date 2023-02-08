const express = require("express");
const router = express.Router();
const { getAllCourses, getOneCourse, postOneCourse, patchOneCourse, deleteOneCourse } = require('./course.controller');


router.route('/programmes')
    .get(getAllCourses)

router.route('/pdf')
    .post(postOneCourse)

router.route('/pdf/:id')
    .get(getOneCourse)
//     .patch(patchOneCourse)
//     .delete(deleteOneCourse)


module.exports = router;