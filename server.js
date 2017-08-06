/*jshint esversion: 6 */
var express = require('express');
var app = express();
const PORT = process.envPORT || 3000;
const db = require('./models'); //pulling in files from models directory

//server
const server = app.listen(PORT, () =>{
  db.sequelize.sync();
  console.log(`Running on ${PORT}`);
});