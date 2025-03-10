// странно, что модели прописаны на mongoose, а подключаешься через mongodb
const mongoose = require("mongoose");

// по дефолту, если не указал путь до коллекции, к которой хочешь подключиться, монга будет подключать к test
// либо нужно укзаать mongodb://127.0.0.1:27017/todo <-
const url = "mongodb://127.0.0.1:27017/";

async function connect() {
    try {
        // Подключаемся к серверу
        await mongoose.connect(url);

        console.log("mongodb connected on", url);
    }catch(err) {
        console.log("Возникла ошибка");
        console.log(err);
    }
}

module.exports = connect
