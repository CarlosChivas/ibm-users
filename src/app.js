const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require('cors');
const { cookie } = require("express/lib/response");
const { SQL_MULT_RESULT_SETS } = require("ibm_db/lib/climacros");
var ibmdb = require("ibm_db")
  , connStr = "DATABASE=bludb;HOSTNAME=2f3279a5-73d1-4859-88f0-a6c3e6b4b907.c3n41cmd0nqnrk39u98g.databases.appdomain.cloud;PORT=30756;PROTOCOL=TCPIP;UID=szg02442;PWD=xIRGnwrUBpJxLXyT;Security=SSL";


require("dotenv").config();
const app = express();
app.use(cors({
  origin: "http://localhost:4200/",
  credentials: true
}))
//Procesar datos enviados desde forms
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())


app.use('/', require("./routes/users.routes.js"));

/*
app.post('/login', (req,res) => {
  console.log(req.body.name);
  ibmdb.open(connStr, function (err,conn) {
    if (err){
      console.log(err);
      res.send("Error with connection");
    } else {
      conn.query("SELECT * FROM users WHERE email = ?", [req.body.email],function(err, data) {
        if(err){
          res.send(err);
        } else{
          if(data.length == 0 || data[0].password != req.body.password){
            res.send("Credenciales incorrectas");
          }
        }
      })
      
    }
  });
})*/

/*app.get('/insert', (req,res) => {
  ibmdb.open(connStr, function (err,conn) {
    if (err){
      console.log(err);
      res.send("Error with connection");
    } else {
      conn.query("SELECT * FROM users;", function(err, data) {
        if(err){
          res.send(err);
        } else{
          console.log(data);
          res.send("Data obtained")
        }
      })
      
    }
  });
})*/

module.exports = app;