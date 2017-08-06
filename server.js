/*jshint esversion: 6 */
const express = require('express');
const app = express();
const PORT = process.envPORT || 3000;
const db = require('./models');
const Gallery = db.Gallery;
const galleryRoutes = require('./routes/galleryRoutes.js');

//this is mounting the routes to the server
app.use('/gallery', galleryRoutes);

//server
const server = app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`Server Running on Port ${PORT}`);
});