const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
      
const app = express();
app.use(express.static("public"));  // статические файлы будут в папке public
app.use(express.json());        // подключаем автоматический парсинг json
const userRouter = require("./routes/userRouter.js");
const homeRouter = require("./routes/homeRouter.js");

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
   
(async () => {
     try {
        await mongoClient.connect();
        app.locals.collection = mongoClient.db("usersdb").collection("users");
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }catch(err) {
        return console.log(err);
    } 
})();
   
app.use("/api/users", userRouter);
app.use("/about", homeRouter);

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async() => {
       
    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});