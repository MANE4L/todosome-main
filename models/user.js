const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// установка схемы
const userScheme = new Schema({
    name: String,
    day: Number,
    month: Number,
    year: Number,
    hour: Number,
    minute: Number,
    id: String
});
module.exports = mongoose.model("User", userScheme);