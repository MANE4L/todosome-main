const express = require("express");
const app = express();
 
app.use(function (_, response) {
    response.send(Buffer.from("Hello Express"));
});
 
app.listen(3000);