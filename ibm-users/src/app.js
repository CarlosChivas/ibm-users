const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require('cors');


require("dotenv").config();
const app = express();
app.use(cors({
  origin: "http://169.51.205.229:31622",
  credentials: true
}))
//Procesar datos enviados desde forms
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())


app.use('/', require("./routes/users.routes.js"));
app.use('/', require("./routes/roles.routes.js"));


module.exports = app;