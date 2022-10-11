const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Recipe = require("../models/Recipe.model");

router.post("/postrecipe", (req, res)=>{

    console.log(req.body)
    const { recipeName, ingredientes, description, tags} = req.body;
    const newRecipe = {
        recipeName: req.body[0], 
        ingredientes: req.body[1],
        description: req.body[2], 
        tags: req.body[3]
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

// router.delete('/recipes/:recipeId', (req, res, next) => {
//     const { recipeId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(recipeId)) {
//         res.status(400).json({ message: 'Specified id is not valid' });
//         return;
//     }

//     Feed.findByIdAndRemove(recipeId)
//         .then((response) => {
//             res.json({
//                 message: `The post: ${response.recipeName} was removed successfully.` })})
//         .catch(err => {
//             res.status(500).json({
//                 message: "error deleting event",
//                 error: err
//             });
//         })
// });




module.exports = router
