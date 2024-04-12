const mongoose = require("mongoose")
const fossilSchema = mongoose.Schema({
    era: String,
    species: String,
    age: Number
})
module.exports = mongoose.model("Fossil", fossilSchema)