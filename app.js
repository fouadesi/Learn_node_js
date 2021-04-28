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

db.connect((err,connection)=> {
    if(err) {
        console.log(err)
    }else {
        console.log("connection created succefully")
    }
})




const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


app.set("app engine","ejs"); 
app.set('views','views/ejs');    
app.use('/home', (req,res,next)=> {
res.render(path.join(__dirname,'./','views','/','ejs/',
"home.ejs"))
}); 
app.use('/signup', (req,res,next)=> {
    res.render(path.join(__dirname,'./','views','/','ejs/',
    "signup.ejs"))
    }); 
 app.post("/registernewuser", async (req,res) =>  {
    console.log("we are here");
    console.log(req.body); 
    const {name , email ,password , confirmpassword} = req.body; 
    db.query("SELECT email FROM users WHERE email = ?",[email],async (error,result)=> {
        if(error) {
            console.log(error);
            return; 
        } else {
            if(result.length > 0) {
                console.log("il existe Dèja");
                return; 
            }else {
            console.log("no error are here");
            var min = 10000;
            var max = 99999;
            var num = Math.floor(Math.random() * (max - min + 1)) + min;
            console.log(num.toString());
            console.log(email);
           
           db.query("INSERT INTO users (name,email,password,active,pin) VALUES  "
            +"(" +"'"+ name +"'"+ ',' +"'" +email.toString() +"'" + ', '  +"'"+password  +"'"+','+ "true,"+ "'"+ num.toString()+"'" +") ;" ,
               async (error,result)=> {
                if(error) {
                    console.log("error in insertion",error)
                }else {
                    console.log("done sending confirmation email now");
                    let transporter = nodemailer.createTransport({
                        service: "gmail", 
                        auth : {
                            user: process.env.EMAIL, 
                            pass : process.env.PASSWORD,                                                                                                                    }
                      });
                      let info = await transporter.sendMail({
                        from: 'f.djellali@esi-sba.dz', // sender address
                        to: email, // list of receivers
                        subject: "Hello ✔", // Subject line
                        text: "Hello world?", // plain text body
                        html: "<b>Hello from node</b>", // html body
                      });
                  transporter.sendMail(info,function(err,data) {
                if (err) {
                    console.log('Err',err); 
                }
            })
                }



           })
            // Step 1 
           
          
            }          
           
        }
    
    })
}) ; 

app.listen(3000); 


