const {Schema, model} = require("mongoose");

const recipeSchema = new Schema(
    {
        recipeName: String,
        ingredientes:[[
            // {
            // ingrediente: String,
            // amount: String
            // }
        ]],
        description: String,    
        tags:[String]
    },
    {
        timestamps: true,
    }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;