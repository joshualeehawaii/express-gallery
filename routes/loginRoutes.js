/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.Gallery;
const passport = require('passport');
const galleryRoute = require('../routes/galleryRoutes.js');
const bcrypt = require('bcrypt');

router
 .post('/', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login'
}));

router
 .get('/', (req, res) => {
  console.log('/gallery/login GET recieved');
  res.render('login');
});

module.exports = router;