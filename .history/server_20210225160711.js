const express = require("express");
const app = express();

app.use(express.static("public"));

const cities = 
     {
                id: 1,
                name: "Berlin",
                country: "Germany",
            },
            {
                id: 2,
                name: "Amsterdam",
                country: "Netherland",
            },
            {
                id: 3,
                name: "Venice",
                country: "Italy",
            },


app.get("/cities", (req, res) => {
    console.log("hit the get route");
});

app.listen(8080, () => console.log("My imageboard is listenning"));
