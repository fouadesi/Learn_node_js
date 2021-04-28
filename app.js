require('dotenv').config(); 
const express = require('express');
const http = require('http'); 
const path = require('path'); 

const app = express(); 
const nodemailer = require("nodemailer");
const mysql = require('mysql');

const db = mysql.createConnection({
    host : "eu-cdbr-west-01.cleardb.com", 
    user : 'bd1e6c3b5f3d3a', 
    password : '61e5ad9e',
    database : 'heroku_42b88a2c1536c29', 
})
console.log("wayli wayli");
db.connect((err,connection)=> {
    if(err) {
        console.log(err)
    }else {
        console.log("connection created succefullyyyyyyyyy")
    }
});
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


app.set("app engine","ejs"); 
app.set('views','views/ejs');    
app.use('/home', (req,res,next)=> {
res.send("hello cv chwiya");
}); 
app.use('/signup', (req,res,next)=> {
    res.render(path.join(__dirname,'./','views','/','ejs/',
    "signup.ejs"))
    }); 
 

app.listen(process.env.PORT || 3000); 


