const express = require("express");
const app = app();

app.use(express.static("public"));

app.listen(8080, () => console.log("My imageborad is listenning"));
