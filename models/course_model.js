const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    course_title: { type: String, required: true, unique: true},
    course_type: { type: String },
    course_version: { type: String },
    course_description: { type: String },
    course_description_plus: { type: String },
    course_price: { type: String },
    course_cost_folder: { type: String },
    course_duration: { type: String },
    course_date: { type: String },
    course_public: { type: String },
    course_condition: { type: String },
    course_condition_plus: { type: String },
    course_pedagogies: [{ type: String }],
    course_objectives: [{ type: String }],
    course_program: [{ 
        program_title: { type: string },
        program_content: { type: string }
     }]
})

const Course = mongoose.model("Course", courseSchema);

module.exports = { Course }