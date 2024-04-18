const mongoose = require("mongoose")
const fossilSchema = mongoose.Schema({
    era:{
        type: String,
        minLength: 5
    },
    species: String,
    age:{
        type: Number,
        min: 10000,
        max: 1000000000   
    }
        
})
module.exports = mongoose.model("Fossil", fossilSchema)