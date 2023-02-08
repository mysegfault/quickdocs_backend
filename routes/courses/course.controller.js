const mongoose = require('mongoose');
const { Course } = require("../../models/course_model");

// Fonction pour obtenir la liste de tous les programmes de formation
exports.getAllCourses = (async (req, res) => {
    try {

        const allCourses = await Course.find()

        res.json(allCourses)
        console.log(allCourses);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to get courses from database' });
    }
})

// getOneCourse Fonction pour afficher 1 programme
exports.getOneCourse = (async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.params.id);

        const showOneCourse = await Course.findById(id)

        return res.json(showOneCourse)
        console.log(showOneCourse);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to get course from database' });
    }
})

// postOneCourse Fonction pour envoyer 1 nouveau programme de formation
exports.postOneCourse = (async (req, res) => {
    try {
        const course = new Course({
            course_title: req.body.course_title,
            course_type: req.body.course_type,
            course_version: req.body.course_version,
            course_description: req.body.course_description,
            course_description_plus: req.body.course_description_plus,
            course_price: req.body.course_price,
            course_cost_folder: req.body.course_cost_folder,
            course_duration: req.body.course_duration,
            course_date: req.body.course_date,
            course_public: req.body.course_public,
            course_condition: req.body.course_condition,
            course_condition_plus: req.body.course_condition_plus,
            course_pedagogies: req.body.course_pedagogies,
            course_objectives: req.body.course_objectives,
            course_program: req.body.course_program,
        });

        const newCourse = await course.save();
        
        res.status(201).json(newCourse);
        console.log(newCourse);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// patchOneCourse Fonctio pour mettre à jour 1 formation


// deleteOneCourse Fonction pour supprimer 1 formation



        // const { 
        //     course_title ,
        //     course_type ,
        //     course_version ,
        //     course_description ,
        //     course_description_plus ,
        //     course_cost_folder ,
        //     course_duration ,
        //     course_date ,
        //     course_public ,
        //     course_condition ,
        //     course_condition_plus ,
        //     course_pedagogies ,
        //     course_objectives ,
        //     course_program } = req.body