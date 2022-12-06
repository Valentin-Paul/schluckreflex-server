const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Recipe = require("../models/Recipe.model");
const fileUploader = require('../api/cloudinary.config');
const {isLoggedIn} = require('../middleware/route-guard')

router.post("/postrecipe", isLoggedIn, fileUploader.single('upload-image'), (req, res)=>{

    const { recipeName, ingredientes, description, tags} = req.body;
    const newRecipe = {
        recipeName: req.body[0], 
        ingredientes: req.body[1],
        description: req.body[2], 
        tags: req.body[3],
        imageUrl: req.body[4]
    }
    
    Recipe.create(newRecipe)
    .then(response => {
        res.json(response)
        console.log(response)
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

router.get('/recipes/:recipeId', (req, res, next) => {
    const {recipeId} = req.params;

    Recipe.findById(recipeId)
    .then((response)=> {
        res.json(response);
        console.log(response)})
    .catch(err => {
        res.status(500).json({
            message: "error finding recipe by ID",
            error: err
        });
    })
});

router.delete('/recipes/:recipeId', isLoggedIn, (req, res, next) => {
    const { recipeId } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    //     res.status(400).json({ message: 'Specified id is not valid' });
    //     return;
    // }

    Recipe.findByIdAndRemove(recipeId)
        .then((response) => {
            res.json({
                message: `The recipe: ${response.recipeName} was removed successfully.` })})
        .catch(err => {
            res.status(500).json({
                message: "error deleting recipe",
                error: err
            });
        })
});

router.put('/recipes/:recipeId', isLoggedIn, (req, res, next) => {
    const { recipeId } = req.params;
    const { recipeName, ingredientes, description, tags, imageUrl } = req.body;

    const updatedRecipe = {
        recipeName: req.body[0], 
        ingredientes: req.body[1],
        description: req.body[2], 
        tags: req.body[3],
        imageUrl: req.body[4]
    }

    Recipe.findByIdAndUpdate(recipeId, updatedRecipe, {new: true})
    .then(response => {
        console.log(response)
        res.json(response)
    })
    .catch(err => {
        res.status(500).json({
            message: 'error updating recipe',
            error: err
        })
    })
})




module.exports = router
