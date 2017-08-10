/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const bp = require('body-parser');
const db = require('../models');
const Gallery = db.Gallery;

router
 .delete('/:id', (req, res) => {
  console.log(`/gallery/${req.params.id} delete ID recieved`);
  res.end();
});

router
 .put('/:id', (req, res) => {
  console.log(`/gallery/${req.params.id} PUT ID recieved`);
  res.end();
});

router
 .get('/:id/edit', (req, res) => {
  console.log(`/gallery/${req.params.id}/edit GET ID and edit recieved`);
  res.end();
});

router
 .post('/', (req, res) => {
  console.log('/gallery POST recieved');
  res.end();
});

router
 .get('/new', (req, res) => {
  console.log('/gallery/new GET new recieved');
  res.end();
});

router
 .get('/:id', (req, res) => {
  console.log(`/gallery/${req.params.id} GET ID recieved`);
  Gallery.findById(parseInt(req.params.id))
  .then ((detail) => {
   console.log('gallery id = ', detail);
   var data = {
    title: detail.tile,
    author: detail.author,
    link: detail.link,
    description: detail.description
   };
   res.render('detail', data);
  })
  .catch ((err) => {
   console.log(err);
  });
});

router
 .get('/', (req, res) => {
  console.log('/gallery GET recieved');
  Gallery.findAll()
  .then((gallery) => {
   console.log('gallery = ', gallery);
   res.render('index', {gallery: gallery});
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;