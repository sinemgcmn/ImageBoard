const express = require("express");
const app = express();
// const multer = require("multer");
// const uidSafe = require("uid-safe");
// const path = require("path");

// const diskStorage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, __dirname + "/uploads");
//     },
//     filename: function (req, file, callback) {
//         uidSafe(24).then(function (uid) {
//             callback(null, uid + path.extname(file.originalname));
//         });
//     },
// });

// const uploader = multer({
//     storage: diskStorage,
//     limits: {
//         fileSize: 2097152,
//     },
// });

const db = require("./db");

app.use(express.static("public"));

app.get("/images", (req, res) => {
    db.getInfoImages()
        .then(({ rows }) => {
            console.log(rows);
            res.json(images);
        })
        .catch((err) => {
            console.log(err);
        });
});

// app.post("/upload", uploader.single("file"), (req, res) => {
//     console.log("hit the post route...");
//     console.log("req.file:", req.file);
//     console.log("req.body:", req.body);
//     if (req.file) {
//         res.json({
//             success: true,
//         });
//     } else {
//         res.json({
//             success: false,
//         });
//     }
// });

app.listen(8080, () => console.log("My imageboard is listening"));
