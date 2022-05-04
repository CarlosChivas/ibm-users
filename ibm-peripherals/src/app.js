const express = require("express");

const app = express();

app.use('/', require("./routes/roles.routes.js"));


module.exports = app;