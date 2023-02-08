const mongoose = require("mongoose");

const gridSchema = new mongoose.Schema({
    grid_file_title: { type: String, required: true, unique: true},
    grid_grid: { type: String, required: true },
    grid_course_title: { type: String, required: true },
    grid_level: { type: String },
    grid_course_type: { type: String },
    grid_course_hours: { type: String },
    grid_other_infos: [{ type: String }],
    grid_firstname: { type: String },
    grid_lastname: { type: String },
    grid_complete_hours: { type: String },
    grid_icdl: { type: String },
    evaluation_array: [{
        session: { type: String },
        contenu_them: [{ type: String }],
        pedagogy_material: [{ type: String }],
        evaluation_modality: [{ type: String }],
        objectives_evaluation: [{
            objective_title: { type: String },
            before_evaluation: { type: String },
            evaluation_rate: { type: String },
            observation: { type: String }
        }]
    }],
    generic_array: [{
        session: { type: String },
        generic_notions: [{ type: String }],
        objectives_generic: [{
            objective_g_title: { type: String },
            notions: [{
                notion_title: { type: String },
                contenus: [{
                    contenu_title: { type: String },
                    exercices_type: [{
                        exercice_title: { type: String },
                        evaluations_rate: [{
                            rate: { type: String },
                            observation: { type: String }
                        }]
                    }]
                }]
            }]
        }]
    }]
})

const Grid = mongoose.model("Grid", gridSchema);

module.exports = { Grid }