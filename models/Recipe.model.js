const {Schema, model} = require("mongoose");

const recipeSchema = new Schema(
    {
        recipeName: String,
        ingredientes:[[]],
        description:[String],    
        tags:[String],
        imageUrl: String
    },
    {
        timestamps: true,
    }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;