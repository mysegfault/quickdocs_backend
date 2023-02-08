const mongoose = require('mongoose');
const { Grid } = require("../../models/grid_model");

// Fonction pour obtenir toutes les grilles
exports.getGrids = (async (req, res) => {
    try {

        const allGrids = await Grid.find()

        res.json(allGrids)
        console.log(allGrids);


    } catch (err) {
        console.error(err.message);
    }
})