const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const userModel = require("./models/users");
const fs = require('fs');

app.post("/api/upload", upload.single("file"), (req, res) => {
  const tempFilePath = req.file.path;
  const fileName = req.file.originalname;
  const filePath = `/tmp/${fileName}`; // Assuming files are stored in /tmp folder
  
  fs.rename(tempFilePath, filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to upload file" });
    } else {
      res.json({ success: true });
    }
  });
});

const app = express();
app.use(cors( {
    origin:["https://image-vercel-front.vercel.app"],
    methods:["POST","GET"],
    credentials: true
  }));
app.use(express.json());
app.use(express.static("public"));

app.post('/', (req, res) => {
    console.log("hello from backend");
    res.send("Response from the backend");
});


mongoose.connect(
  "mongodb+srv://IsaacNjenga:cations!@cluster0.xf14h71.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0"
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), (req, res) => {
  userModel
    .create({ image: req.file.filename })
    .then((createdUser) => {
      res.json(createdUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/getImage", (req, res) => {
  userModel
    .find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.listen(3001, () => {
  console.log("Connected");
});
