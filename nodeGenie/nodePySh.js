var PythonShell = require('python-shell');
const express = require('express');
const oracledb = require('oracledb');
var bodyParser = require('body-parser');
//const MongoClient=require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Post = require('./models/Post');

//var pyshell = new PythonShell('./autoApp.py');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

//mongodb connection  http://10.176.40.203
///var uri="mongodb+srv://m001-student:pz50HHKQQUeFCiFf@m001-sandbox-abx9j.mongodb.net/test?retryWrites=true";
var uri = 'mongodb://localhost:27017/edi';
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to Db');
    })
    .catch((error) => {
        console.log(error);
    })


//Pending to use mongoose save method to update data into db.
app.post('/dbUpdate', (req, res) => {
    console.log('in Dbupdate');
    const post = new Post({
        userEmail:req.body.userEmail,
        anaStatus:req.body.anaStatus,
        anaName: req.body.anaName,
        anaEmail:req.body.anaEmail
    });
    console.log(post);
    post.save();
    res.status(201).json({
        message: 'Details added successfully'
    });
  
});

    app.listen(5000, () => {
        console.log('Listening on port 5000');
    })