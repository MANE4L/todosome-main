const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// установка схемы
//схема отвечает за задачу, так что лучше назвать подходяще
const todoScheme = new Schema({
    name: String,
    day: Number,
    month: Number,
    year: Number,
    hour: Number,
    minute: Number,
    id: String
});

module.exports = mongoose.model("todo", todoScheme, 'todo');