const express = require("express");
const connect = require("./mongodb.js");
const homeRouter = require("./routes/homeRouter.js");
const todoRouter = require("./routes/todoRouter.js");
      
const app = express();
app.use(express.static("public"));  // статические файлы будут в папке public
app.use(express.json());        // подключаем автоматический парсинг json

(async () => {
     try {
        await connect()
        app.listen(3000);
        console.log("Сервер слушает 3000 порт");
    }catch(err) {
        return console.log(err);
    } 
})();
   
app.use("/api/todo", todoRouter);
app.use("/about", homeRouter);

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async() => {
    console.log("Приложение завершило работу");
    process.exit();
});