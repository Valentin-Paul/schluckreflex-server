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


router.get("/recipes", (req, res)=>{
    Recipe.find()
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        err.message = "Error getting recipes",
        res.status(500).json(err.message);
    })
})


router.delete('/recipes/:recipeId', (req, res, next) => {
    const { recipeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Feed.findByIdAndRemove(recipeId)
        .then((response) => {
            res.json({
                message: `The post: ${response.recipeName} was removed successfully.` })})
        .catch(err => {
            res.status(500).json({
                message: "error deleting event",
                error: err
            });
        })
});

module.exports = router