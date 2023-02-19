// imports
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3');
const { config } = require('dotenv');
const multer = require('multer');


// setting up express
const app = express();


// Define the storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        console.log(file)
        const filename = file.originalname.replace(extension, '') + '-' + Date.now() + extension;
        cb(null, filename);
    }
});

// Set the options for the multer middleware
const upload = multer({ storage: storage });

//Setting up static page to use css and images
app.use(express.static("public"));

// routes are exported
const route = require('./Route/route');

// userschema is exported
const userModel = require('./model/userModel')

// configure bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set view Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// configure route which is in route folder
app.use('/', route);


// create database
const db = new sqlite3.Database('./master.db');





//configure the server
app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("http://localhost:" + process.env.PORT || 3000);
})

