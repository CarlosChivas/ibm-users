const express = require("express");
var name = "s";
var ibmdb = require("ibm_db")
  , connStr = "DATABASE=bludb;HOSTNAME=2f3279a5-73d1-4859-88f0-a6c3e6b4b907.c3n41cmd0nqnrk39u98g.databases.appdomain.cloud;PORT=30756;PROTOCOL=TCPIP;UID=szg02442;PWD=xIRGnwrUBpJxLXyT;Security=SSL";

  
  ibmdb.open(connStr, function (err,conn) {
    if (err){
      console.log(err)
    } else {
      console.log(conn);
    }
  });

const app = express();

app.get('/', (req,res) => {
    res.send("Hola mundo");
})

module.exports = app;