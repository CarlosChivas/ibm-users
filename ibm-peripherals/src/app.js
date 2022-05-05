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
  origin: "http://localhost:4200",
  credentials: true
}))
//Procesar datos enviados desde forms
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())


app.use('/', require("./routes/peripherals.routes.js"));
app.use('/', require("./routes/roles.routes.js"));


module.exports = app;