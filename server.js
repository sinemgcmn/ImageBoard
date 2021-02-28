const express = require("express");
const app = express();
const db = require("./db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const config = require("./config");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(express.static("public"));

app.get("/images", (req, res) => {
    db.getInfoImages()
        .then(({ rows }) => {
            res.json(rows);
            console.log("stuck etmiyorum");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("hello");
    const { filename } = req.file;
    const url = config.s3Url + filename;
    // console.log(url);
    const { title, username, description } = req.body;

    if (req.file) {
        db.addImage(title, description, username, url).then(({ rows }) => {
            console.log(rows);
            res.json({
                success: true,
            });
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.listen(8080, () => console.log("My imageboard is listening"));
