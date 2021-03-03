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
app.use(express.json());
app.use(express.static("public"));

app.get("/images", (req, res) => {
    db.getInfoImages()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
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

app.get("/images/:id", (req, res) => {
    db.getImageById(req.params.id)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/more/:lowestId", (req, res) => {
    const lowestId = req.params.lowestId;
    // console.log(db.getLastImage);
    db.getFurtherImages(lowestId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/get-comments/:imageid", (req, res) => {
    db.getAllComments(req.params.imageid)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/comment", (req, res) => {
    const { comment, username, imageid } = req.body;
    db.insertComments(comment, username, imageid).then(({ rows }) => {
        console.log(rows);
        res.json({
            success: true,
        });
    });
});

app.listen(8080, () => console.log("My imageboard is listening"));
