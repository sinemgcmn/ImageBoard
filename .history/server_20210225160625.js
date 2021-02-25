const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/cities", (req, res) => {
    console.log("hit the get route");
});

app.listen(8080, () => console.log("My imageboard is listenning"));
