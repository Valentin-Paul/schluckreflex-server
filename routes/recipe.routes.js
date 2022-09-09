const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Recipe = require("../models/Recipe.model");

router.post("/postrecipe", (req, res)=>{

    const { recipeName, ingredientes, tags} = req.body;
    const newRecipe = {
        recipeName, 
        ingredientes, 
        tags
    }
    Recipe.create(newRecipe)
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        err.message = "Error creating a new recipe",
        res.status(500).json(err.message);
    })
})

module.exports = router