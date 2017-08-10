/*jshint esversion: 6 */
const express = require('express');
const app = express();
const PORT = process.envPORT || 3000;
const db = require('./models');
const Gallery = db.Gallery;
const galleryRoutes = require('./routes/galleryRoutes.js');
const bp = require('body-parser');

//handlebars
require('handlebars');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//app level middleware to read the post data
app.use(bp.urlencoded());

//this is mounting the routes to the server
app.use('/gallery', galleryRoutes);

//server
const server = app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`Server Running on Port ${PORT}`);
});