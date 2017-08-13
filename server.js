/*jshint esversion: 6 */
const express = require('express');
const app = express();
const PORT = process.envPORT || 3000;
const db = require('./models');
const Gallery = db.Gallery;
const galleryRoutes = require('./routes/galleryRoutes.js');
const bp = require('body-parser');
const methodOverride = require('method-override');

//exposing the public folder
app.use(express.static('public'));


//app level middleware to read the post data
app.use(bp.urlencoded()); //this is to read the object being sent through from the post request

//using method overirde to send put and delete requests
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//handlebars
require('handlebars');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');



//this is mounting the routes to the server
app.use('/gallery', galleryRoutes);

//server
const server = app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`Server Running on Port ${PORT}`);
});