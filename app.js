require('dotenv').config(); 
const express = require('express');
const http = require('http'); 
const path = require('path'); 

const app = express(); 
const nodemailer = require("nodemailer");
const mysql = require('mysql');

const db = mysql.createConnection({
    host : "34.72.148.89", 
    user : 'root', 
    password : '12345678',
    database : 'hygeiadb', 
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

    db.query("SELECT * FROM test ",(err,result)=> {
        if(err) {
            console.log("error in selecting data from",err)
        }else {
            console.log(result.length);
            res.send(result[0].name);
        }
    })

}); 
app.use('/signup', (req,res,next)=> {
    res.render(path.join(__dirname,'./','views','/','ejs/',
    "signup.ejs"))
    }); 
 

app.listen(process.env.PORT || 3000); 


